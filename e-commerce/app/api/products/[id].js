import { firestore } from "@/lib/firebase"; // Adjust the import according to your Firebase configuration
import { NextResponse } from "next/server";

/**
 * @param {GET updated Product} request
 * @param {Using it id} param1
 */

export async function GET(_request, { params }) {
  const { id } = params;

  try {
    // Reference to the specific product document by ID
    const productRef = firestore.collection('products').doc(id);
    
    // Fetch the product document
    const doc = await productRef.get();

    // Check if the document exists
    if (!doc.exists) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Return the product data
    const product = { id: doc.id, ...doc.data() };
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to load product' }, { status: 500 });
  }
}
