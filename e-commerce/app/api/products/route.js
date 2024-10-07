import { collection, query, orderBy, limit, startAt, getDocs } from 'firebase/firestore';
import { db } from '@/app/lib/firebase';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const pageSize = parseInt(searchParams.get('pageSize')) || 10;
    const category = searchParams.get('category');
    const sortBy = searchParams.get('sortBy') || 'price';
    const sortOrder = searchParams.get('sortOrder') || 'asc';

    let productsQuery = collection(db, 'products');

    // Apply category filter if provided
    if (category) {
      productsQuery = query(productsQuery, where('categoryId', '==', category));
    }

    // Apply sorting
    productsQuery = query(productsQuery, orderBy(sortBy, sortOrder));

    // Pagination logic using `startAt` instead of `startAfter` for numeric pagination
    const offset = (page - 1) * pageSize;
    productsQuery = query(productsQuery, limit(pageSize), startAt(offset));

    const productsSnapshot = await getDocs(productsQuery);
    const products = productsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Determine if there are more products
    const hasMore = products.length === pageSize;

    return NextResponse.json({
      products,
      page,
      pageSize,
      hasMore,
    });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
