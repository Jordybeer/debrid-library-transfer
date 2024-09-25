// components/TorrentList.tsx

import React from 'react';

interface TorrentListProps {
  torrents: any[];
  selectedTorrents: string[];
  setSelectedTorrents: (ids: string[]) => void;
}

const TorrentList: React.FC<TorrentListProps> = ({
  torrents,
  selectedTorrents,
  setSelectedTorrents,
}) => {
  const handleSelect = (id: string) => {
    if (selectedTorrents.includes(id)) {
      setSelectedTorrents(selectedTorrents.filter((tid) => tid !== id));
    } else {
      setSelectedTorrents([...selectedTorrents, id]);
    }
  };

  return (
    <ul className="divide-y divide-gray-200">
      {torrents.map((torrent) => {
        const inputId = `torrent-checkbox-${torrent.id}`;

        return (
          <li
            key={torrent.id}
            className="py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <div className="flex items-center">
              <input
                id={inputId}
                type="checkbox"
                checked={selectedTorrents.includes(torrent.id)}
                onChange={() => handleSelect(torrent.id)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor={inputId}
                className="ml-3 text-gray-700 dark:text-gray-300"
              >
                {torrent.filename}
              </label>
            </div>
            <span className="text-sm text-gray-500">{torrent.size} MB</span>
          </li>
        );
      })}
    </ul>
  );
};

export default TorrentList;
