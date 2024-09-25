// pages/api/alldebrid-auth.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { apiKey } = req.body;

  if (!apiKey) {
    res.status(400).json({ error: 'API key is required.' });
    return;
  }

  // Store the API key in a cookie
  res.setHeader('Set-Cookie', `ad_api_key=${apiKey}; Path=/; HttpOnly; Secure; SameSite=Lax;`);
  res.redirect('/');
}
