import { firestore } from 'lib/firebase'; // Adjust the import according to your Firebase configuration
import { NextResponse } from 'next/server';

export async function GET(req, _res) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category'); // Get the 'category' query param
  const search = searchParams.get('search');

  try {
    // Initialize a Firestore reference to the 'products' collection
    const productsRef = firestore.collection('products');
    
    // Start building the query
    let query = productsRef;

    // Filter by category if provided and not 'default'
    if (category && category !== 'default') {
      query = query.where('category', '==', category);
    }

    // Filter by search string if provided and not null
    if (search && search !== 'null') {
      query = query.where('title', '>=', search).where('title', '<=', search + '\uf8ff'); // Case-insensitive search
    }

    // Fetch products
    const snapshot = await query.get();
    
    // Map the documents to a usable format
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ products });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to load products' });
  }
}
