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
import ImageCarousel from './components/imageCarousel';
import Info from "../app/assets/info.png";
import Link from 'next/link';
import Image from 'next/image';
import SkeletonLoader from './components/productsSkeleton'; // Import your Skeleton Loader
import { fetchCategories, fetchProducts } from '../app/components/FetchProducts'; // Import fetch functions

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [hasMore, setHasMore] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true); // Set loading to true before fetching
      const params = {
        page,
        pageSize,
        search: searchTerm,
        category: selectedCategory,
        ...(sortOrder && { sortBy: 'price', sortOrder }),
      };

      try {
        const data = await fetchProducts(params);
        setProducts(data.products);
        setTotalProducts(data.total);
        setHasMore(data.hasMore);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    loadProducts();
  }, [page, searchTerm, selectedCategory, sortOrder, pageSize]);

  const totalPages = Math.ceil(totalProducts / pageSize);

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
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
    return <div className="flex space-x-2">{pageNumbers}</div>;
  };

  return (
    <div className='mt-20'>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
      />

      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>

      <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="">Default</option>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>

      <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 mt-10'>
        {loading ? ( // Conditional rendering for loading
          Array.from({ length: 10 }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))
        ) : (
          products.map(product => (
            <div key={product.id} className='p-4 shadow-md rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105'>
              <p className="text-orange-600 text-md italic font-medium">
                {product.category}
              </p>
              <div className="h-48 flex items-center justify-center">
                <ImageCarousel
                  images={product.images}
                  thumbnail={product.thumbnail}
                />
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
          ))
        )}
      </div>

      <div className="pagination mt-4">
        {totalPages > 1 && renderPagination()}
      </div>
    </div>
  );
}
