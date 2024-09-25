// pages/api/migrate.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getRealDebridTorrents } from '../../lib/realdebrid';
import { addMagnetToAllDebrid } from '../../lib/alldebrid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { rd_access_token, ad_api_key } = req.cookies;

  if (!rd_access_token || !ad_api_key) {
    res.status(401).json({ error: 'Authentication required.' });
    return;
  }

  const { torrentIds } = req.body;

  try {
    // Fetch torrents from Real-Debrid
    const torrents = await getRealDebridTorrents(rd_access_token);

    // Filter selected torrents
    const selectedTorrents = torrents.filter((torrent: any) =>
      torrentIds.includes(torrent.id)
    );

    // Migrate each torrent
    for (const torrent of selectedTorrents) {
      await addMagnetToAllDebrid(torrent.magnet, ad_api_key);
    }

    res.status(200).json({ message: 'Migration successful.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
