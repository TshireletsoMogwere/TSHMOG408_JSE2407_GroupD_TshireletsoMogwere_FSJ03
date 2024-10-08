import { getAuth } from 'firebase-admin/auth';
import { db } from '../../../lib/firebase';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { productId, rating, comment } = req.body;

    try {
      // Verify the ID token from the request headers
      const idToken = req.headers.authorization.split('Bearer ')[1];
      const user = await getAuth().verifyIdToken(idToken);

      const reviewData = {
        rating,
        comment,
        date: new Date().toISOString(),
        reviewerEmail: user.email,
        reviewerName: user.displayName || 'Anonymous',
      };

      // Save the review under the specified product
      await db.collection('products').doc(productId).collection('reviews').add(reviewData);
      return res.status(201).json({ message: 'Review added successfully.' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to add review.' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
