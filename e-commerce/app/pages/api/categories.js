import { db } from '../../firebase'; 

export default async function handler(req, res) {
  try {
    const categoriesRef = db.collection('categories');
    const snapshot = await categoriesRef.get();

    const categories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
}
