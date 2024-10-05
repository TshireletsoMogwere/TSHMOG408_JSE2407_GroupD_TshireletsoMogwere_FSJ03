"use client"
// import Search from "./components/searchBar";
import CategoryList from "./components/filter";
// import Sort from "./components/sort";
import ProductList from "./components/productList";
// import Paginate from "./components/pagination";

// /**
//  * Fetches products from the API with pagination and filtering.
//  *
//  * @param {number} page - The current page number.
//  * @param {number} limit - The number of products to fetch per page.
//  * @param {string} searchTerm - The search term for filtering.
//  * @param {string} selectedCategory - The selected category for filtering.
//  * @param {string} sortOrder - The order to sort the products.
//  * @returns {Promise<Object>} - A promise that resolves to an object containing products and total count.
//  * @throws {Error} - Throws an error if the fetch request fails.
//  */
// const fetchProducts = async (page, limit, searchTerm, selectedCategory, sortOrder) => {
//   const response = await fetch(
//     `http://localhost:3000/api/products?page=${page}&limit=${limit}&search=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(selectedCategory)}&sort=${encodeURIComponent(sortOrder)}`,
//     {
//       cache: "force-cache",
//       next: { revalidate: 60 },
//     }
//   );

//   if (!response.ok) {
//     throw new Error("Failed to fetch products");
//   }

//   const data = await response.json();
//   console.log("Fetched Products:", data); // Log the data to see its structure

//   // Ensure data is an object with products and total count
//   if (!Array.isArray(data.products)) {
//     throw new Error("Expected an array of products");
//   }

//   return data; // Return the array of products
// };


// /**
//  * Fetches categories from the API.
//  *
//  * @returns {Promise<Array>} - A promise that resolves to an array of categories.
//  * @throws {Error} - Throws an error if the fetch request fails.
//  */
// const fetchCategories = async () => {
//   const response = await fetch('http://localhost:3000/api/categories'); // Adjust the API endpoint as necessary
//   if (!response.ok) {
//     throw new Error("Failed to fetch categories");
//   }

//   const data = await response.json();
//   console.log("Fetched Categories:", data); // Log the categories to see their structure
//   return ["All", ...data]; // Prepend "All" to the categories array
// };

// /**
//  * Main Home component that renders the product listing page.
//  *
//  * @param {Object} props - The component props.
//  * @param {Object} props.searchParams - The search parameters from the URL.
//  * @returns {JSX.Element} - The rendered Home component.
//  */
// const Home = async ({ searchParams }) => {
//   const page = parseInt(searchParams.page, 10) || 1;
//   const limit = 20; 
//   const searchTerm = searchParams.search || ""; // Get search term from URL
//   const selectedCategory = searchParams.category || "All";
//   const sortOrder = searchParams.sort || "default";

//   // Fetch products with pagination and filters
//   const { products, totalCount } = await fetchProducts(page, limit, searchTerm, selectedCategory, sortOrder);

//   // Fetch categories for the filter
//   const categories = await fetchCategories();

//   return (
//     <div>
//       <Search initialSearchTerm={searchTerm} />
//       <div className="flex justify-center mt-10 space-x-2">
//         <Filter categories={categories} selectedCategory={selectedCategory} /> {/* Pass fetched categories */}
//         <Sort sortOrder={sortOrder} />
//         <a
//           href="/?page=1" // Adjust the URL to reset filters
//           className="inline-block bg-white text-black rounded border border-gray-300 h-6 w-13 text-center px-3 focus:outline-none focus:border-orange-500"
//         >
//           Reset Filters
//         </a>
//       </div>

//       {/* Render the ProductList component */}
//       <ProductList products={products} searchParams={searchParams} /> 

//       <Paginate
//         currentPage={page}
//         totalProducts={totalCount} // Pass the total count of products for pagination
//         productsPerPage={limit}
//       />
//     </div>
//   );
// };

// export default Home;

export const getProducts = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/products")
    if (!res) {
      throw new ErrorBoundary("Failed to fetch")
    }
    const data = await res.json();
    return data;
  } catch(error) {
    console.error("failed to fetch", error)
  }
};

const getCategories = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/categories"); // Ensure your API route is correct
    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
};

const handleCategorySelect = (category) => {
  setSelectedCategory(category);
  getProducts(category); // Fetch products filtered by the selected category
};

const page = async () => {
  const products = await getProducts();
  const categories = await getCategories();
  return (
    <>
   <CategoryList categories={categories}  onCategorySelect={handleCategorySelect}  />
      <ProductList products={products}  /> 
     
    </>
  )
}
export default page

