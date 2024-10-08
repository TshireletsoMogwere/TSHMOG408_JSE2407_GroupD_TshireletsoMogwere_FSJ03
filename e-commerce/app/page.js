// "use client"
// import Search from "./components/searchBar";
// import CategoryList from "./components/filter";
// import Sort from "./components/sort";
// import ProductList from "./components/productList";
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
'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Info from './assets/info.png';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');  // Default to 'asc' for low to high
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1);  // Total number of pages

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://digitizemart.vercel.app/api/categories');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        console.log('Categories fetched:', data); // Check the API response here
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
  
    fetchCategories();
  }, []);

  useEffect(() => {
    // Fetch products when filters change or page changes
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams({
          page,
          pageSize,
          search: searchTerm,
          category: selectedCategory,
          sortBy: 'price',  // Sorting by price
          sortOrder,
        }).toString();

        const res = await fetch(`https://digitizemart.vercel.app/api/products?${params}`, {
          method: 'GET',
         
        });
        
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await res.json();
        setProducts(data.products);  // Reset products on new page
        setHasMore(data.hasMore);
       
        const totalProducts = data.totalProducts || 194; // Set a default or get it from API
        setTotalPages(Math.ceil(totalProducts / pageSize));  // Calculate total pages
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, [page, searchTerm, selectedCategory, sortOrder, pageSize]);

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);  // Update the page when a number is clicked
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-3 py-1 ${page === i ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div>
      <h1>Product Store</h1>

      {/* Search */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
      />

      {/* Filter by Category */}
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.length === 0 ? (
          <option disabled>No categories available</option>
        ) : (
          categories.map((category, index) => (
            <option key={index} value={category.name}>
              {category.name} {/* Use the name field */}
            </option>
          ))
        )}
      </select>

      {/* Sort by Price */}
      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>

      {/* Product List */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 mt-10">
        {products.map((product) => (
          <div key={product.id} className="p-4 shadow-md rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105">
            <p className="text-orange-600 text-md italic font-medium">
              {product.category}
            </p>
            <div className="h-48 flex items-center justify-center">
              <Image src={product.thumbnail} alt={product.title} width={200} height={200} />
            </div>
            <h2 className="text-lg font-bold">{product.title}</h2>
            <div className="text-md text-orange-600 font-semibold mt-2 flex items-center justify-between">
              <span>€{product.price}</span>
              <Link
                href={{
                  pathname: `/product/${product.id}`,
                }}
              >
                <Image src={Info} alt="info" className="w-6" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination mt-4">
        {renderPagination()}
      </div>
    </div>
  );
}
