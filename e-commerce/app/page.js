"use client";
import { useEffect, useState } from "react";
import ImageCarousel from "./components/imageCarousel";
import Info from "../app/assets/info.png";
import Link from "next/link";
import Image from "next/image";
import SkeletonLoader from "./components/productsSkeleton"; // Import your Skeleton Loader
import {
  fetchCategories,
  fetchProducts,
} from "../app/components/FetchProducts"; // Import fetch functions
import Header from "./components/header";

/**
* The Home component is the main page of the e-commerce application.
* It displays a list of products, allows users to search, filter, and sort products,
* and handles pagination.//+
*
* @returns {JSX.Element} - The Home component.
*/
export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [hasMore, setHasMore] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true); 
      const params = {
        page,
        pageSize,
        search: searchTerm,
        category: selectedCategory,
        ...(sortOrder && { sortBy: "price", sortOrder }),
      };

      try {
        const data = await fetchProducts(params);
        setProducts(data.products);
        setTotalProducts(data.total);
        setHasMore(data.hasMore);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false); 
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
          className={`px-3 py-1 ${page === i ? "bg-orange-500 text-white" : "bg-gray-200"}`}
        >
          {i}
        </button>
      );
    }
    return <div className="flex space-x-2">{pageNumbers}</div>;
  };

  return (
    <>
      <Header />
      <div className="mt-20">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Default</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 mt-10">
          {loading // Conditional rendering for loading
            ? Array.from({ length: 10 }).map((_, index) => (
                <SkeletonLoader key={index} />
              ))
            : products.map((product) => (
                <div
                  key={product.id}
                  className="p-4 shadow-md rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
                >
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
                    <Link href={`/product/${product.id}`}>
                      <Image src={Info} alt="info" className="w-6" />
                    </Link>
                  </div>
                </div>
              ))}
        </div>

        <div className="pagination mt-4">
          {totalPages > 1 && renderPagination()}
        </div>
      </div>
    </>
  );
}

