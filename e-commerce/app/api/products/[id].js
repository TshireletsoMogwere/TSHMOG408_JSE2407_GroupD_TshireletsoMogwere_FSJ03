import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export async function GET(request, { params }) {
  try {
    const { id } = params;  // Get the id from URL params
    const productDoc = doc(db, 'products', id);  // Reference to product document in Firestore
    const productSnapshot = await getDoc(productDoc);  // Fetch product data

    if (!productSnapshot.exists()) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const product = {
      id: productSnapshot.id,
      ...productSnapshot.data()  // Combine product data
    };

    return NextResponse.json(product);  // Return the product data
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
