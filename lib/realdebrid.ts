// lib/realdebrid.ts

import axios from 'axios';

const REAL_DEBRID_API = 'https://api.real-debrid.com/rest/1.0';

export async function getRealDebridTorrents(accessToken: string) {
  try {
    const response = await axios.get(`${REAL_DEBRID_API}/torrents`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch torrents from Real-Debrid.');
  }
}
