// import Link from "next/link";
// import Image from "next/image";
// import Info from "../assets/info.png";
// import ImageCarousel from "./imageCarousel";

// /**
//  * ProductList is a functional component that renders a list of products.
//  * @param {Object} props - The component's props
//  * @param {Array} props.products - An array of product objects.
//  * @param {Object} props.searchParams - The current search, filter, and sort state.
//  * @returns {JSX.Element} - A JSX element representing the product list.
//  */
// const ProductList = ({ products, searchParams }) => {
//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4 mt-10">
//       {products.length === 0 ? (
//         <p>No products found</p>
//       ) : (
//         products.map((product) => (
//           <div
//             key={product.id}
//             className="p-4 shadow-md rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105"
//           >
//             <p className="text-orange-600 text-md italic font-medium">
//               {product.category}
//             </p>

//             <div className="h-48 flex items-center justify-center">
//               <ImageCarousel
//                 images={product.images}
//                 thumbnail={product.thumbnail}
//               />
//             </div>

//             <h2 className="text-lg font-bold">{product.title}</h2>

//             <div className="text-md text-orange-600 font-semibold mt-2 flex items-center justify-between">
//               <span>€{product.price}</span>
//               <Link
//                 href={{
//                   pathname: `/product/${product.id}`,
//                   query: searchParams,
//                 }}
//               >
//                 <Image src={Info} alt="info" className="w-6" />
//               </Link>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default ProductList;

import Link from 'next/link';

export default function ProductList({ products }) {
  // Ensure products is always an array
  const safeProducts = Array.isArray(products) ? products : [];

  if (safeProducts.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {safeProducts.map((product) => (
        <Link href={`/product/${product.id}`} key={product.id}>
          <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover mb-4" />
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-2">{product.category}</p>
            <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}