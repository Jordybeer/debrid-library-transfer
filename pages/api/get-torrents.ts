// pages/api/get-torrents.ts

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { rd_access_token } = req.cookies;

  if (!rd_access_token) {
    res.status(401).json({ error: 'User is not authenticated.' });
    return;
  }

  try {
    const response = await axios.get('https://api.real-debrid.com/rest/1.0/torrents', {
      headers: {
        Authorization: `Bearer ${rd_access_token}`,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching torrents:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch torrents from Real-Debrid.' });
  }
}
