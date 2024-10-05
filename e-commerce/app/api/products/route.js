import { db } from "@/app/lib/firebase";
import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";

export async function GET () {
  try {
    const productsCollection = collection(db, "products")
    const productsDoc = await getDocs(productsCollection)
    const page = productsDoc.docs.map(doc=> ({
      id: doc.id,
      ...doc.data()
    }))
    return NextResponse.json(page)
  } catch (error) {
    return NextResponse.json({error: "Failed to fetch products"}, {status: 500})
  }
}


