import { NextResponse } from "next/server";
import { db } from "@/app/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

/*
* Retrieves a list of unique product categories from the Firestore database.
*
* @async
* @returns {NextResponse} A JSON response containing an array of unique categories.
* If an error occurs during the fetch, a JSON response with an error message and a 500 status code is returned.
*/
export async function GET() {
  try {
    const productsCollection = collection(db, "products");
    const productsSnapshot = await getDocs(productsCollection);
    const products = productsSnapshot.docs.map((doc) => doc.data());

    // Extract unique categories from products
    const categories = [
      ...new Set(products.map((product) => product.category)),
    ].map((category) => ({ name: category }));

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

