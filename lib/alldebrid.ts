// lib/alldebrid.ts

import axios from 'axios';

const ALL_DEBRID_API = 'https://api.alldebrid.com/v4';

export async function addMagnetToAllDebrid(magnetLink: string, apiKey: string) {
  try {
    const response = await axios.get(`${ALL_DEBRID_API}/magnet/upload`, {
      params: {
        magnet: magnetLink,
        agent: 'DebridMigrationTool',
        apikey: apiKey,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to add magnet link to AllDebrid.');
  }
}
