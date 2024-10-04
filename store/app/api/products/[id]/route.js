import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export async function GET(request, { params }) {
  const { id } = params;
  const docRef = doc(db, 'products', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return Response.json({ id: docSnap.id, ...docSnap.data() });
  } else {
    return Response.json({ error: 'Product not found' }, { status: 404 });
  }
}