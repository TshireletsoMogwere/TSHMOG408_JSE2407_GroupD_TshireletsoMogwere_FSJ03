export async function GET() {
    try {
      const categoriesCollection = collection(db, "categories");
      const categoriesDoc = await getDocs(categoriesCollection);
      const categories = categoriesDoc.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      return NextResponse.json(categories);
    } catch (error) {
      return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
    }
  }