// pages/api/alldebrid-auth.ts

import { NextApiRequest, NextApiResponse } from 'next';

// This is a placeholder for storing the API key securely.
// In production, consider a secure storage solution.

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { apiKey } = req.body;

  if (!apiKey) {
    res.status(400).json({ error: 'API key is required.' });
    return;
  }

  // Store the API key in a cookie (for simplicity)
  res.setHeader('Set-Cookie', `ad_api_key=${apiKey}; Path=/; HttpOnly; Secure;`);
  res.status(200).json({ message: 'API key stored successfully.' });
}
