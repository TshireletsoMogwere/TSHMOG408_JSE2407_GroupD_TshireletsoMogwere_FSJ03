import { db } from '../../firebase'; // Adjust the import based on your file structure

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const productDoc = await db.collection('products').doc(id).get();

    if (!productDoc.exists) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ id: productDoc.id, ...productDoc.data() });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving product', error });
  }
}
