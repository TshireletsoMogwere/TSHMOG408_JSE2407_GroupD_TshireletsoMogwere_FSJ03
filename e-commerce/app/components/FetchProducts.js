/**
 * Fetches a list of categories from the API.
 *
 * @returns {Promise<Object[]>} A promise that resolves to an array of category objects.
 * @throws {Error} If the request fails.
 */
const API_URL = 'http://localhost:3000/api';

 export const fetchCategories = async () => {
  const res = await fetch(`${API_URL}/categories`);
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return await res.json();
};

/**
 * Fetches a list of products from the API based on the provided parameters.
 *
 * @param {Object} params - The query parameters for the API request.
 * @returns {Promise<Object[]>} A promise that resolves to an array of product objects.
 * @throws {Error} If the request fails.
 */
export const fetchProducts = async (params) => {
  const queryString = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/products?${queryString}`);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  return await res.json();
};

/**
 * Fetches a single product by its ID from the API.
 *
 * @param {string} id - The ID of the product to fetch.
 * @returns {Promise<Object>} A promise that resolves to the product object.
 * @throws {Error} If the request fails or if the product with the given ID is not found.
 */
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product with ID ${id}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

