// pages/api/realdebrid-auth.ts

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const REAL_DEBRID_AUTH_URL = 'https://api.real-debrid.com/oauth/v2';

let deviceCode = '';
let interval = 0;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { polling } = req.query;

  if (!polling) {
    // Step 1: Start device authentication flow
    try {
      const response = await axios.post(
        `${REAL_DEBRID_AUTH_URL}/device/code`,
        null,
        {
          params: {
            client_id: 'X245A4XAIBGVM',
            new_credentials: 'yes',
          },
        }
      );

      deviceCode = response.data.device_code;
      interval = response.data.interval;

      // Send user_code and verification_url to the client
      res.status(200).json({
        user_code: response.data.user_code,
        verification_url: response.data.verification_url,
        interval: response.data.interval,
      });
    } catch (error) {
      console.error('Device code error:', error.response?.data || error.message);
      res.status(500).json({ error: 'Failed to start device authentication.' });
    }
  } else {
    // Step 2: Poll for token
    try {
      const tokenResponse = await axios.post(
        `${REAL_DEBRID_AUTH_URL}/device/credentials`,
        null,
        {
          params: {
            client_id: 'X245A4XAIBGVM',
            code: deviceCode,
          },
        }
      );

      // Store the access token in a cookie
      res.setHeader('Set-Cookie', [
        `rd_access_token=${tokenResponse.data.access_token}; Path=/; HttpOnly; Secure; SameSite=Lax;`,
      ]);

      res.status(200).json({ success: true });
    } catch (error) {
      if (error.response?.data?.error === 'authorization_pending') {
        // User hasn't authorized yet; continue polling
        res.status(200).json({ success: false });
      } else {
        console.error('Token polling error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to retrieve access token.' });
      }
    }
  }
}
