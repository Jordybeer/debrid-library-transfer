// pages/index.tsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import DeviceAuth from '../components/DeviceAuth';
import Spinner from '../components/Spinner';
import UserStatus from '../components/UserStatus';
import TorrentList from '../components/TorrentList';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasAdApiKey, setHasAdApiKey] = useState<boolean | null>(null);
  const [torrents, setTorrents] = useState([]);
  const [selectedTorrents, setSelectedTorrents] = useState<string[]>([]);
  const [isLoadingTorrents, setIsLoadingTorrents] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if the user is authenticated with Real-Debrid
    axios
      .get('/api/check-auth')
      .then((response) => {
        setIsAuthenticated(response.data.isAuthenticated);
      })
      .catch((error) => {
        console.error('Error checking authentication status:', error);
        setIsAuthenticated(false);
      })
      .finally(() => {
        setIsLoading(false);
      });

    // Check if AllDebrid API key is present in cookies
    const hasAdKey = typeof document !== 'undefined' && document.cookie.includes('ad_api_key');
    setHasAdApiKey(hasAdKey);
  }, []);

  useEffect(() => {
    if (isAuthenticated && hasAdApiKey) {
      // Fetch torrents from Real-Debrid
      setIsLoadingTorrents(true);
      axios
        .get('/api/get-torrents')
        .then((response) => setTorrents(response.data))
        .catch((error) => {
          console.error(error);
          setError('Failed to fetch torrents from Real-Debrid.');
        })
        .finally(() => setIsLoadingTorrents(false));
    }
  }, [isAuthenticated, hasAdApiKey]);

  const handleMigrate = () => {
    axios
      .post('/api/migrate', { torrentIds: selectedTorrents })
      .then((response) => alert(response.data.message))
      .catch((error) => alert(error.response.data.error));
  };

  const handleApiKeySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const apiKeyInput = event.currentTarget.elements.namedItem('apiKey') as HTMLInputElement;
    const apiKey = apiKeyInput.value.trim();

    if (!apiKey) {
      alert('Please enter a valid AllDebrid API key.');
      return;
    }

    // Store the API key in a cookie
    document.cookie = `ad_api_key=${apiKey}; Path=/; HttpOnly; SameSite=Lax`;

    // Update the state
    setHasAdApiKey(true);
  };

  if (isLoading) {
    // Show spinner while checking authentication status
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    // User is not authenticated with Real-Debrid
    return <DeviceAuth />;
  }

  if (!hasAdApiKey) {
    // User has not provided AllDebrid API key
    return (
      <div className="max-w-md w-full mx-auto p-6 bg-white bg-opacity-10 backdrop-blur-md rounded-lg text-center">
        <h2 className="text-xl font-semibold mb-4">Enter AllDebrid API Key</h2>
        <form onSubmit={handleApiKeySubmit}>
          <input
            type="text"
            name="apiKey"
            placeholder="AllDebrid API Key"
            className="w-full px-3 py-2 mb-4 bg-gray-700 text-white rounded"
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-primary text-white font-semibold rounded hover:bg-primary-dark transition duration-200"
          >
            Save API Key
          </button>
        </form>
      </div>
    );
  }

  if (isLoadingTorrents) {
    // Show spinner while fetching torrents
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    // Display error message if there was an error fetching torrents
    return (
      <div className="max-w-md w-full mx-auto p-6 bg-red-600 bg-opacity-20 backdrop-blur-md rounded-lg text-center">
        <p className="mb-6 text-lg text-red-300">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <UserStatus />
      <h1 className="text-2xl font-bold mb-4">Real-Debrid Torrents</h1>
      {torrents.length > 0 ? (
        <>
          <TorrentList
            torrents={torrents}
            selectedTorrents={selectedTorrents}
            setSelectedTorrents={setSelectedTorrents}
          />
          <button
            onClick={handleMigrate}
            className="mt-4 w-full py-2 px-4 bg-secondary text-white font-semibold rounded hover:bg-secondary-dark transition duration-200"
            disabled={selectedTorrents.length === 0}
          >
            Migrate Selected Torrents to AllDebrid
          </button>
        </>
      ) : (
        <p className="text-gray-300">No torrents found in your Real-Debrid account.</p>
      )}
    </div>
  );
};

export default Home;
