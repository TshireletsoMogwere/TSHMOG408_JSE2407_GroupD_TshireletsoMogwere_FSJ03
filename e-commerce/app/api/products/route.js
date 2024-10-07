import { collection, query, where, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';
import { NextResponse } from 'next/server';
import Fuse from 'fuse.js';
import runCors from '@/app/lib/cors'; 

export async function GET(request) {
   // Run the CORS middleware
   const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', 'https://digitizemart.vercel.app/api/products'); // Your frontend origin
  headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const pageSize = parseInt(searchParams.get('pageSize')) || 10;
    const category = searchParams.get('category');
    const sortBy = searchParams.get('sortBy') || 'price';
    const sortOrder = searchParams.get('sortOrder') || 'asc';
    const search = searchParams.get('search') || '';

    let productsQuery = collection(db, 'products');

    // Apply category filter if provided
    if (category) {
      productsQuery = query(productsQuery, where('categoryId', '==', category));
    }

    // Apply sorting
    productsQuery = query(productsQuery, orderBy(sortBy, sortOrder));

    // Fetch products without pagination for Fuse search
    const allProductsSnapshot = await getDocs(productsQuery);
    const allProducts = allProductsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Use Fuse.js for searching
    let products = allProducts;
    if (search) {
      const fuse = new Fuse(allProducts, {
        keys: ['title'], 
        threshold: 0.3,
      });
      const searchResults = fuse.search(search);
      products = searchResults.map(result => result.item);
    }

    // Pagination logic
    const startIndex = (page - 1) * pageSize;
    const paginatedProducts = products.slice(startIndex, startIndex + pageSize);

    // Determine if there are more products
    const hasMore = paginatedProducts.length === pageSize;

    return NextResponse.json({
      products: paginatedProducts,
      page,
      pageSize,
      hasMore,
    });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
