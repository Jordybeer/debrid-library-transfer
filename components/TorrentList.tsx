// components/TorrentList.tsx

import React from 'react';

interface Torrent {
  id: string;
  filename: string;
  bytes: number;
}

interface Props {
  torrents: Torrent[];
  selectedTorrents: string[];
  setSelectedTorrents: React.Dispatch<React.SetStateAction<string[]>>;
}

const TorrentList: React.FC<Props> = ({ torrents, selectedTorrents, setSelectedTorrents }) => {
  const handleSelect = (id: string) => {
    setSelectedTorrents((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((tid) => tid !== id) : [...prevSelected, id]
    );
  };

  return (
    <ul className="divide-y divide-gray-700">
      {torrents.map((torrent) => (
        <li
          key={torrent.id}
          className="py-4 flex items-center justify-between hover:bg-white hover:bg-opacity-10 transition duration-200"
        >
          <div className="flex items-center">
            <input
              id={torrent.id}
              type="checkbox"
              checked={selectedTorrents.includes(torrent.id)}
              onChange={() => handleSelect(torrent.id)}
              className="h-4 w-4 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary"
            />
            <label htmlFor={torrent.id} className="ml-3 text-gray-100">
              {torrent.filename}
            </label>
          </div>
          <span className="text-sm text-gray-400">
            {(torrent.bytes / 1e6).toFixed(2)} MB
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TorrentList;
