import { NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { db } from '../../../lib/firebase';

export async function POST(req) {
  // Parse the request body
  const { productId, rating, comment } = await req.json();

  try {
    // Verify the ID token from the request headers
    const idToken = req.headers.get('Authorization')?.split('Bearer ')[1];
    if (!idToken) {
      return NextResponse.json({ error: 'Authorization token missing.' }, { status: 401 });
    }

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

    return NextResponse.json({ message: 'Review added successfully.' }, { status: 201 });
  } catch (error) {
    console.error('Error adding review:', error);
    return NextResponse.json({ error: 'Failed to add review.' }, { status: 500 });
  }
}
