// pages/api/realdebrid-auth.ts

import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const REAL_DEBRID_AUTH_URL = 'https://api.real-debrid.com/oauth/v2';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { polling } = req.query;

  if (!polling) {
    // Step 1: Start device authentication flow
    try {
      const response = await axios.get(`${REAL_DEBRID_AUTH_URL}/device/code`, {
        params: {
          client_id: 'X245A4XAIBGVM',
          new_credentials: 'yes',
        },
      });

      // Send user_code, verification_url, device_code, and interval to the client
      res.status(200).json({
        user_code: response.data.user_code,
        verification_url: response.data.verification_url,
        interval: response.data.interval,
        device_code: response.data.device_code,
      });
    } catch (error: any) {
      console.error('Device code error:', error.response?.data || error.message);
      res.status(500).json({ error: 'Failed to start device authentication.' });
    }
  } else {
    // Step 3: Poll for credentials
    const { device_code } = req.body;

    if (!device_code) {
      res.status(400).json({ error: 'Missing device_code in request body.' });
      return;
    }

    try {
      const credentialsResponse = await axios.get(`${REAL_DEBRID_AUTH_URL}/device/credentials`, {
        params: {
          client_id: 'X245A4XAIBGVM',
          code: device_code,
        },
      });

      // Check if client_id and client_secret are present
      if (credentialsResponse.data.client_id && credentialsResponse.data.client_secret) {
        const userClientId = credentialsResponse.data.client_id;
        const userClientSecret = credentialsResponse.data.client_secret;

        // Step 4: Obtain access token
        const data = new URLSearchParams();
        data.append('client_id', userClientId);
        data.append('client_secret', userClientSecret);
        data.append('code', device_code);
        data.append('grant_type', 'http://oauth.net/grant_type/device/1.0');

        const tokenResponse = await axios.post(
          `${REAL_DEBRID_AUTH_URL}/token`,
          data.toString(),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );

        const { access_token, expires_in, refresh_token } = tokenResponse.data;

        // Store the access token and refresh token in cookies
        const isProduction = process.env.NODE_ENV === 'production';

        res.setHeader('Set-Cookie', [
          `rd_access_token=${access_token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${expires_in}${
            isProduction ? '; Secure' : ''
          }`,
          `rd_refresh_token=${refresh_token}; Path=/; HttpOnly; SameSite=Lax${
            isProduction ? '; Secure' : ''
          }`,
        ]);

        res.status(200).json({ success: true });
      } else {
        // User hasn't authorized yet; continue polling
        res.status(200).json({ success: false });
      }
    } catch (error: any) {
      const errorData = error.response?.data || {};
      const errorCode = errorData.error_code;
      const errorMessage = errorData.error || error.message;

      console.error('Token polling error:', errorData);

      if (errorCode === 11 || errorMessage === 'authorization_pending') {
        // User hasn't authorized yet; continue polling
        res.status(200).json({ success: false });
      } else if (errorCode === 12 || errorMessage === 'bad_device_code') {
        // Invalid device code
        res.status(400).json({ error: 'Invalid or expired device code.' });
      } else if (errorCode === 13 || errorMessage === 'access_denied') {
        // User denied the authorization
        res.status(400).json({ error: 'Access denied by user.' });
      } else {
        res.status(500).json({ error: 'Failed to retrieve access token.' });
      }
    }
  }
}
