// api/auth/signout.js
import { signOutUser } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await signOutUser();
      res.status(200).json({ message: 'Signed out successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
