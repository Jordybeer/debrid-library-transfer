// components/DeviceAuth.tsx

import React, { useEffect, useState } from 'react';
import Spinner from './Spinner';

const DeviceAuth: React.FC = () => {
  const [userCode, setUserCode] = useState('');
  const [verificationUrl, setVerificationUrl] = useState('');
  const [deviceCode, setDeviceCode] = useState('');
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [pollingInterval, setPollingInterval] = useState(5000); // Default to 5 seconds
  const [error, setError] = useState('');
  const [isPollingStarted, setIsPollingStarted] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');

  useEffect(() => {
    // Start the device authentication flow
    fetch('/api/realdebrid-auth')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          return;
        }

        setUserCode(data.user_code);
        setVerificationUrl(data.verification_url);
        setDeviceCode(data.device_code);
        setPollingInterval((data.interval || 5) * 1000); // Convert to milliseconds
      })
      .catch((error) => {
        console.error(error);
        setError('Failed to start device authentication.');
      });
  }, []);

  const startPolling = () => {
    if (isPollingStarted) return;

    setIsPollingStarted(true);
    // Open the Real-Debrid device page
    window.open(verificationUrl || 'https://real-debrid.com/device', '_blank');

    // Start polling for credentials
    const id = setInterval(() => {
      fetch('/api/realdebrid-auth?polling=true', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ device_code: deviceCode }),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success) {
            // Authentication successful, reload the page
            if (intervalId) clearInterval(intervalId);
            window.location.reload();
          } else if (result.error) {
            // Handle error (e.g., access denied)
            setError(result.error);
            if (intervalId) clearInterval(intervalId);
          }
        })
        .catch((error) => {
          console.error(error);
          setError('An error occurred during authentication.');
        });
    }, pollingInterval);

    setIntervalId(id);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(userCode).then(
      () => {
        setCopySuccess('Copied!');
        setTimeout(() => setCopySuccess(''), 2000);
      },
      (err) => {
        console.error('Failed to copy text: ', err);
      }
    );
  };

  if (error) {
    return (
      <div className="max-w-md w-full mx-auto p-6 bg-red-600 bg-opacity-20 backdrop-blur-md rounded-lg text-center">
        <p className="mb-6 text-lg text-red-300">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white bg-opacity-5 backdrop-blur-md rounded-lg text-center">
      <p className="mb-4 text-lg text-gray-200">
        Please authorize the application by entering the code below at
      </p>
      <a
        href={verificationUrl || 'https://real-debrid.com/device'}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline text-xl"
      >
        real-debrid.com/device
      </a>
      <div className="flex items-center justify-center mt-6 mb-4">
        <div className="text-4xl font-bold tracking-widest mr-2 text-gray-100">
          {userCode || 'Loading...'}
        </div>
        {userCode && (
          <button
            onClick={handleCopy}
            className="p-2 bg-primary text-white rounded hover:bg-primary-dark transition duration-200"
            aria-label="Copy to clipboard"
          >
            {/* Clipboard Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {/* ... SVG path */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7h8M8 11h8m-5 4h5M7 4h10v16H7V4z"
              />
            </svg>
          </button>
        )}
        {copySuccess && <span className="text-sm text-green-300 ml-2">{copySuccess}</span>}
      </div>
      <button
        onClick={startPolling}
        className="mt-4 w-full py-2 px-4 bg-secondary text-white font-semibold rounded hover:bg-secondary-dark transition duration-200"
      >
        Continue
      </button>
      {isPollingStarted && (
        <div className="mt-6">
          <Spinner />
          <p className="text-sm text-gray-300 mt-2">Waiting for authorization...</p>
        </div>
      )}
    </div>
  );
};

export default DeviceAuth;
