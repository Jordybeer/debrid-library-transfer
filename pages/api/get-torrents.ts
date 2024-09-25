// pages/api/get-torrents.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getRealDebridTorrents } from '../../lib/realdebrid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { rd_access_token } = req.cookies;

  if (!rd_access_token) {
    res.status(401).json({ error: 'Real-Debrid authentication required.' });
    return;
  }

  try {
    const torrents = await getRealDebridTorrents(rd_access_token);
    res.status(200).json(torrents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
