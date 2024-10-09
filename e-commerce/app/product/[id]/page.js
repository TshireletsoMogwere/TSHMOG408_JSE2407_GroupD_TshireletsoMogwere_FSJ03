

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Back from "../../assets/turn-back.png";
import { FaStar, FaShoppingCart, FaHeart } from "react-icons/fa";
import Link from "next/link";
import RootLayout from "@/app/layout";
import { fetchProductById } from "@/app/components/FetchProducts";

export default function ProductDetails({ params, searchParams }) {
  const { id } = params;
  console.log(params); {/**Log the params to see if id is present*/}

  const [product, setProduct] = useState({}); // Initialize as an empty object
  const [sortCriteria, setSortCriteria] = useState("date"); // default sort by date
  const [error, setError] = useState(null);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        console.error("Product ID is not available");
        return;
      }
      try {
        const productData = await fetchProductById(id);
        setProduct(productData);
      } catch (err) {
        console.error("Failed to fetch product details", err);
        setError("Failed to fetch product details. Please try again later.");
      }
    };

    fetchProduct();
  }, [id]);

  if (error) {
    return <p className="text-red-500 text-center text-xl mt-8">{error}</p>;
  }

  // Sort reviews based on the selected criteria
  const sortedReviews = product.reviews
    ? [...product.reviews].sort((a, b) => {
        if (sortCriteria === "date") {
          return new Date(b.date) - new Date(a.date); // most recent first
        } else if (sortCriteria === "rating") {
          return b.rating - a.rating; // highest rating first
        }
        return 0; // default case
      })
    : [];

  const handleAddReview = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
          rating: newRating,
          comment: newComment,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setProduct((prevProduct) => ({
          ...prevProduct,
          reviews: [
            ...prevProduct.reviews,
            { ...data, reviewerName: "Your Name" },
          ],
        }));
        alert(data.message);
        setNewRating(0);
        setNewComment("");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const handleEditReview = async (reviewId) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating: newRating, comment: newComment }),
      });

      const data = await response.json();
      if (response.ok) {
        setProduct((prevProduct) => {
          const updatedReviews = prevProduct.reviews.map((review) =>
            review.id === reviewId
              ? { ...review, rating: newRating, comment: newComment }
              : review
          );
          return { ...prevProduct, reviews: updatedReviews };
        });
        alert(data.message);
        setNewRating(0);
        setNewComment("");
        setIsEditing(false);
        setEditingReviewId(null);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error editing review:", error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (response.ok) {
        setProduct((prevProduct) => ({
          ...prevProduct,
          reviews: prevProduct.reviews.filter(
            (review) => review.id !== reviewId
          ),
        }));
        alert(data.message);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <RootLayout productTitle={product.title} showHeader={true}>
      {/* Back button */}
      <div className="mt-5 ml-10 w-14">
        <Link href={{ pathname: "/", query: { ...searchParams } }}>
          <Image src={Back} alt="turn-back" />
        </Link>
      </div>

      {/* Product Details */}
      <div className="max-w-6xl mx-auto p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery or Single Image */}
          <div>
            {product.images && product.images.length > 1 ? (
              <div className="grid grid-cols-2 gap-4">
                {product.images.map((img, idx) => (
                  <Image
                    key={idx}
                    src={img}
                    alt={`${product.title} image ${idx + 1}`}
                    width={500}
                    height={500}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                ))}
              </div>
            ) : (
              <Image
                src={product.thumbnail}
                alt={product.title}
                width={500}
                height={500}
                className="w-full h-auto object-cover rounded-lg"
              />
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-orange-600 italic mb-4">{product.category}</p>

            {/* Price */}
            <p className="text-2xl text-orange-600 font-bold mb-4">
              €{product.price?.toFixed(2)}
            </p>

            {/* Description */}
            <p className="mb-4">{product.description}</p>

            {/* Tags */}
            {product.tags && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-orange-400 text-gray-800 px-2 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Status */}
            <div className="mb-4 p-2 rounded">
              {product.inStock ? "In stock" : "Out of stock!"}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg flex items-center justify-center">
                <FaShoppingCart className="mr-2" />
                Add to Cart
              </button>
              <button className="bg-orange-100 text-gray-800 py-2 px-4 rounded-lg">
                <FaHeart />
              </button>
            </div>
          </div>
        </div>

        {/* User Reviews */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>

          {/* Sorting Buttons */}
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setSortCriteria("date")}
              className={`py-2 px-4 rounded-lg ${sortCriteria === "date" ? "bg-orange-600 text-white" : "bg-gray-200"}`}
            >
              Sort by Date
            </button>
            <button
              onClick={() => setSortCriteria("rating")}
              className={`py-2 px-4 rounded-lg ${sortCriteria === "rating" ? "bg-orange-600 text-white" : "bg-gray-200"}`}
            >
              Sort by Rating
            </button>
          </div>

          {/* Review Form */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Review" : "Add a Review"}
            </h2>
            <form
              onSubmit={
                isEditing
                  ? (e) => {
                      e.preventDefault();
                      handleEditReview(editingReviewId);
                    }
                  : handleAddReview
              }
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`w-5 h-5 cursor-pointer ${i < newRating ? "text-orange-400" : "text-gray-300"}`}
                    onClick={() => setNewRating(i + 1)}
                  />
                ))}
              </div>
              <textarea
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Write your comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-orange-600 text-white py-2 px-4 rounded-lg"
              >
                {isEditing ? "Update Review" : "Submit Review"}
              </button>
            </form>
          </div>

          {/* Display Reviews */}
          {sortedReviews.length > 0 ? (
            <div className="mt-4">
              {sortedReviews.map((review) => (
                <div
                  key={review.id}
                  className="border-b border-gray-300 mb-4 pb-4"
                >
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`w-5 h-5 ${i < review.rating ? "text-orange-400" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p>{review.comment}</p>
                  <div className="flex gap-4 mt-2">
                    <button
                      className="text-blue-600"
                      onClick={() => {
                        setIsEditing(true);
                        setEditingReviewId(review.id);
                        setNewRating(review.rating);
                        setNewComment(review.comment);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => handleDeleteReview(review.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>
    </RootLayout>
  );
}
