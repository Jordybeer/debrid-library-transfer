// pages/api/check-auth.ts

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { rd_access_token } = req.cookies;

  if (!rd_access_token) {
    res.status(200).json({ isAuthenticated: false });
    return;
  }

  try {
    // Verify the access token by calling the Real-Debrid API
    const response = await axios.get('https://api.real-debrid.com/rest/1.0/user', {
      headers: {
        Authorization: `Bearer ${rd_access_token}`,
      },
    });

    if (response.status === 200) {
      res.status(200).json({ isAuthenticated: true });
    } else {
      res.status(200).json({ isAuthenticated: false });
    }
  } catch (error) {
    console.error('Error verifying access token:', error.response?.data || error.message);
    res.status(200).json({ isAuthenticated: false });
  }
}
