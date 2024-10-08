import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await signOut(auth);
      res.status(200).json({ message: 'Signed out successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
