import { db } from "@/app/lib/firebase";
import { NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";

/**
 * Fetches a single product by its ID from the Firestore database.
 *
 * @param {Request} req - The incoming HTTP request.
 * @param {Object} context - Context containing the request parameters, including the product ID.
 * @returns {Promise<NextResponse>} - A promise that resolves to a Next.js response object containing the product.
 *
 * @throws Will throw an error if fetching the product fails or the product is not found.
 */

export async function GET(req, { params }) {
  try {
    let { id } = params;

    // Pad the ID with leading zeros if necessary
    id = id.padStart(3, "0");

    const productRef = doc(db, "products", id);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const productData = productSnap.data();

    if (!productData) {
      return NextResponse.json(
        { error: "Product exists but has no data" },
        { status: 500 }
      );
    }

    const product = {
      id: productSnap.id,
      ...productData,
    };

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch Product", details: error.message },
      { status: 500 }
    );
  }
}
