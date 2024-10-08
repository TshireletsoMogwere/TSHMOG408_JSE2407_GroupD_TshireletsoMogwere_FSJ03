import { getAuth } from 'firebase-admin/auth';
import { db } from '../../../lib/firebase';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { reviewId, productId, rating, comment } = req.body;

    try {
      const idToken = req.headers.authorization.split('Bearer ')[1];
      const user = await getAuth().verifyIdToken(idToken);

      const reviewRef = db.collection('products').doc(productId).collection('reviews').doc(reviewId);
      await reviewRef.update({ rating, comment });
      return res.status(200).json({ message: 'Review updated successfully.' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update review.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
