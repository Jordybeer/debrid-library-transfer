// components/UserStatus.tsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner'

const UserStatus: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('/api/realdebrid-user')
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user info:', error.response?.data || error.message);
        setError('Failed to retrieve user information.');
      });
  }, []);

  if (error) {
    return (
      <div className="bg-red-600 bg-opacity-20 p-4 rounded mb-4">
        <p className="text-red-300">{error}</p>
      </div>
    );
  }

  if (!userInfo) {
    return <Spinner />;
  }

  return (
    <div className="bg-green-600 bg-opacity-20 p-4 rounded mb-4">
      <p className="text-green-300">Connected to Real-Debrid as {userInfo.username}</p>
    </div>
  );
};

export default UserStatus;
