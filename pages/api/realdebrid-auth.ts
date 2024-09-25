// pages/api/realdebrid-auth.ts

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const REAL_DEBRID_AUTH_URL = 'https://api.real-debrid.com/oauth/v2';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  if (!code) {
    // Step 1: Redirect user to Real-Debrid authorization URL
    const authUrl = `${REAL_DEBRID_AUTH_URL}/authorize?client_id=${process.env.REAL_DEBRID_CLIENT_ID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_BASE_URL}/api/realdebrid-auth`;
    res.redirect(authUrl);
  } else {
    // Step 2: Exchange code for access token
    try {
      const tokenResponse = await axios.post(`${REAL_DEBRID_AUTH_URL}/token`, null, {
        params: {
          client_id: process.env.REAL_DEBRID_CLIENT_ID,
          client_secret: process.env.REAL_DEBRID_CLIENT_SECRET,
          code,
          grant_type: 'http://oauth.net/grant_type/device/1.0',
        },
      });

      // Store the access token in a cookie (for simplicity)
      res.setHeader(
        'Set-Cookie',
        `rd_access_token=${tokenResponse.data.access_token}; Path=/; HttpOnly; Secure;`
      );
      res.redirect('/');
    } catch (error) {
      res.status(500).send('Authentication with Real-Debrid failed.');
    }
  }
}
