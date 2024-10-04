import { db } from "@/lib/firebase";
import { collection, getDocs } from 'firebase/firestore';

export async function GET() {
  const categoriesSnapshot = await getDocs(collection(db, 'categories'));
  const categories = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return Response.json(categories);
}