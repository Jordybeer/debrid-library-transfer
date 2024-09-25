// pages/index.tsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import TorrentList from '../components/TorrentList';
import DeviceAuth from '../components/DeviceAuth';

export default function Home() {
  const [torrents, setTorrents] = useState([]);
  const [selectedTorrents, setSelectedTorrents] = useState<string[]>([]);
  const [hasRdAccessToken, setHasRdAccessToken] = useState<boolean | null>(null);
  const [hasAdApiKey, setHasAdApiKey] = useState<boolean | null>(null);

  // Check authentication status
  useEffect(() => {
    const hasRdToken = document.cookie.includes('rd_access_token');
    const hasAdKey = document.cookie.includes('ad_api_key');
    setHasRdAccessToken(hasRdToken);
    setHasAdApiKey(hasAdKey);

    if (hasRdToken && hasAdKey) {
      // Fetch torrents if authenticated
      axios
        .get('/api/get-torrents')
        .then((response) => setTorrents(response.data))
        .catch((error) => console.error(error));
    }
  }, []);

  const handleMigrate = () => {
    axios
      .post('/api/migrate', { torrentIds: selectedTorrents })
      .then((response) => alert(response.data.message))
      .catch((error) => alert(error.response.data.error));
  };

  if (hasRdAccessToken === null || hasAdApiKey === null) {
    // While checking authentication status, render nothing or a loading state
    return null; // or return <div>Loading...</div>;
  }

  if (!hasRdAccessToken) {
    return <DeviceAuth />;
  }

  if (!hasAdApiKey) {
    return (
      <div className="max-w-xl mx-auto mt-10">
        <p className="mb-6 text-lg">
          Please enter your AllDebrid API key to continue.
        </p>
        <form
          action="/api/alldebrid-auth"
          method="POST"
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            name="apiKey"
            placeholder="AllDebrid API Key"
            required
            className="flex-grow py-2 px-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-4">Your Real-Debrid Torrents</h2>
      <TorrentList
        torrents={torrents}
        selectedTorrents={selectedTorrents}
        setSelectedTorrents={setSelectedTorrents}
      />
      <button
        onClick={handleMigrate}
        className="mt-6 py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Migrate Selected Torrents to AllDebrid
      </button>
    </div>
  );
}
