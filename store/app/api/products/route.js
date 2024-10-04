import { db } from '@/lib/firebase';
import { collection, query, getDocs, where, orderBy, limit, startAfter } from 'firebase/firestore';
import Fuse from 'fuse.js';

const ITEMS_PER_PAGE = 10;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page')) || 1;
  const searchQuery = searchParams.get('search') || '';
  const category = searchParams.get('category');
  const sortBy = searchParams.get('sortBy') || 'price';
  const sortOrder = searchParams.get('sortOrder') || 'asc';

  // Initial query to get the products collection
  let q = query(collection(db, 'products'));

  // Filter by category if provided
  if (category) {
    q = query(q, where('category', '==', category));
  }

  // Order the results
  q = query(q, orderBy(sortBy, sortOrder === 'asc' ? 'asc' : 'desc'));

  // Get all products to calculate the total number of products
  const allProductsSnapshot = await getDocs(q);
  const totalProducts = allProductsSnapshot.size; // Total number of products
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE); // Calculate total pages

  // Modify the query for pagination
  if (page > 1) {
    const snapshot = await getDocs(query(q, limit((page - 1) * ITEMS_PER_PAGE)));
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
    q = query(q, startAfter(lastVisible));
  }

  // Limit the number of products returned for the current page
  q = query(q, limit(ITEMS_PER_PAGE));
  
  // Fetch the products for the current page
  const snapshot = await getDocs(q);
  let products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // Perform search if a search query is provided
  if (searchQuery) {
    const fuse = new Fuse(products, { keys: ['title'], threshold: 0.4 });
    products = fuse.search(searchQuery).map(result => result.item);
  }

  return Response.json({
    products,
    page,
    totalPages, // Return total pages
    hasMore: page < totalPages, // Determine if there are more pages available
  });
}
