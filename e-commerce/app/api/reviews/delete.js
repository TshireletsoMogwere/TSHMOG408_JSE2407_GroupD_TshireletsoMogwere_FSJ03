import { NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { db } from '../../../lib/firebase';

export async function DELETE(req) {
  // Parse the request body
  const { reviewId, productId } = await req.json();

  try {
    // Verify the ID token from the request headers
    const idToken = req.headers.get('Authorization')?.split('Bearer ')[1];
    if (!idToken) {
      return NextResponse.json({ error: 'Authorization token missing.' }, { status: 401 });
    }

    const user = await getAuth().verifyIdToken(idToken);

    // Reference to the review document to delete
    const reviewRef = db.collection('products').doc(productId).collection('reviews').doc(reviewId);
    await reviewRef.delete();

    return NextResponse.json({ message: 'Review deleted successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json({ error: 'Failed to delete review.' }, { status: 500 });
  }
}
