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
        return { products: [] }; // Ensure that it returns an empty array on failure
    }
};

export default getProducts;
