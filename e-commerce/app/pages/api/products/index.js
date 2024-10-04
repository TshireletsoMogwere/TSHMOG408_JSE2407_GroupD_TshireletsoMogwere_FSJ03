import { db } from "../../lib/firebase"; 

// Define a maximum limit for product queries
const MAX_LIMIT = 100; 

export default async function handler(req, res) {
  const { page = 1, limit = 20, search = '', category = 'All', sort = 'default' } = req.query;

  // Convert limit to a number and apply max limit
  const parsedLimit = Math.min(Number(limit), MAX_LIMIT);

  try {
    let query = db.collection('products');

    // Implement search
    if (search) {
      query = query.where('title', '>=', search).where('title', '<=', search + '\uf8ff');
    }

    // Implement category filtering
    if (category && category !== 'All') {
      query = query.where('category', '==', category);
    }

    // Implement sorting
    if (sort === 'lowToHigh') {
      query = query.orderBy('price', 'asc');
    } else if (sort === 'highToLow') {
      query = query.orderBy('price', 'desc');
    }

    // Paginate results
    const snapshot = await query.limit(parsedLimit).get();
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Get total count of products for pagination
    const totalCountSnapshot = await db.collection('products').get();
    const totalCount = totalCountSnapshot.docs.length;

    res.status(200).json({ products, totalCount }); // Return both products and total count
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}
