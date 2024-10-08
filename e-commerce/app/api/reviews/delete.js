import { getAuth } from 'firebase-admin/auth';
import { db } from '../../../lib/firebase';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { reviewId, productId } = req.body;

    try {
      const idToken = req.headers.authorization.split('Bearer ')[1];
      const user = await getAuth().verifyIdToken(idToken);

      const reviewRef = db.collection('products').doc(productId).collection('reviews').doc(reviewId);
      await reviewRef.delete();
      return res.status(200).json({ message: 'Review deleted successfully.' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete review.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
