// app/utils/fetchData.js
const API_URL = 'http://localhost:3000/api';

export const fetchCategories = async () => {
  const res = await fetch(`${API_URL}/categories`);
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  return await res.json();
};

export const fetchProducts = async (params) => {
  const queryString = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/products?${queryString}`);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return await res.json();
};

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