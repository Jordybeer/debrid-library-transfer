// components/DeviceAuth.tsx

import React, { useEffect, useState } from 'react';

const DeviceAuth: React.FC = () => {
  const [userCode, setUserCode] = useState('');
  const [verificationUrl, setVerificationUrl] = useState('');
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start the device authentication flow
    fetch('/api/realdebrid-auth')
      .then((res) => res.json())
      .then((data) => {
        setUserCode(data.user_code);
        setVerificationUrl(data.verification_url);

        // Start polling for token
        const id = setInterval(() => {
          fetch('/api/realdebrid-auth?polling=true')
            .then((res) => res.json())
            .then((result) => {
              if (result.success) {
                // Authentication successful, reload the page
                if (intervalId) clearInterval(intervalId);
                window.location.reload();
              }
            })
            .catch((error) => console.error(error));
        }, data.interval * 1000);

        setIntervalId(id);
      })
      .catch((error) => console.error(error));

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 text-center">
      <p className="mb-6 text-lg">
        Please authorize the application by entering the code below at{' '}
        <a
          href="https://real-debrid.com/device"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          real-debrid.com/device
        </a>
      </p>
      <div className="text-3xl font-bold mb-4">{userCode}</div>
      <p className="text-sm text-gray-500">Waiting for authorization...</p>
    </div>
  );
};

export default DeviceAuth;
