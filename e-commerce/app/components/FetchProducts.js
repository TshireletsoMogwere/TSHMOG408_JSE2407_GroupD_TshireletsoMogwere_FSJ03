// FetchProducts.js
/**
 * Fetches products from server 
 * 
 * @param {*} category 
 * @returns 
 */


const getProducts = async (category = 'all') => {
    try {
        const res = await fetch(`http://localhost:3000/api/products/?filter=${category}`, { cache: "force-cache" });
        if (!res.ok) {
            throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch products", error);
        return { products: [] }; 
    }
};

export default getProducts;


export const fetchProductById = async (id) => {
  const productRef = doc(db, 'products', id); // Replace 'products' with your actual collection name
  const productSnap = await getDoc(productRef);

  if (productSnap.exists()) {
    return { id: productSnap.id, ...productSnap.data() };
  } else {
    throw new Error('No such product!');
  }
};
