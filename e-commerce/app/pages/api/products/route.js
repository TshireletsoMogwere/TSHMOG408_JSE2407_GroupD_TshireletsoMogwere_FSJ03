import { firestore } from 'lib/firebase'; // Adjust the import according to your Firebase configuration
import { NextResponse } from 'next/server';

export async function GET(req, _res) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category'); // Get the 'category' query param
  const search = searchParams.get('search');
  const page = parseInt(searchParams.get('page'), 10) || 1; // Current page number
  const limit = parseInt(searchParams.get('limit'), 10) || 20; // Products per page
  const startAfter = (page - 1) * limit; // Calculate starting point for pagination

  try {
    // Initialize a Firestore reference to the 'products' collection
    const productsRef = firestore.collection('products');
    
    // Start building the query
    let query = productsRef;

    // Filter by category if provided and not 'default'
    if (category && category !== 'All') {
      query = query.where('category', '==', category);
    }

    // Filter by search string if provided and not null
    if (search && search !== 'null') {
      query = query.where('title', '>=', search).where('title', '<=', search + '\uf8ff'); // Case-insensitive search
    }

    // Apply pagination
    const snapshot = await query.limit(limit).get(); // Get the products based on limit

    // Map the documents to a usable format
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Get total count of products for pagination
    const totalCountSnapshot = await productsRef.get(); // Fetch total products count
    const totalCount = totalCountSnapshot.docs.length; // Count documents

    return NextResponse.json({ products, totalCount });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to load products' });
  }
}
