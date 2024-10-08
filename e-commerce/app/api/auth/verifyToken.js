import { auth } from '@/lib/firebaseAdmin';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const idToken = req.headers.authorization?.split('Bearer ')[1];

    try {
      const decodedToken = await auth.verifyIdToken(idToken);
      // Continue with your API logic
      res.status(200).json({ message: 'Token verified', uid: decodedToken.uid });
    } catch (error) {
      console.error('Error verifying token:', error);
      res.status(401).json({ error: 'Unauthorized' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
