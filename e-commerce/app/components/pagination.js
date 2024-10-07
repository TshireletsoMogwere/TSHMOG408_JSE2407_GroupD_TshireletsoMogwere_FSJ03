// import Link from "next/link";

// /**
//  * A function to generate pagination links for a product listing page.
//  *
//  * @param {Object} props - The properties passed to the Paginate component.
//  * @param {number} props.totalProducts - The total number of products to be paginated.
//  * @param {number} props.productsPerPage - The number of products to display per page.
//  * @param {number} props.currentPage - The current page number being displayed.
//  *
//  * @returns {JSX.Element} - A JSX element containing the pagination links.
//  */
// export default function Paginate({
//   totalProducts,
//   productsPerPage,
//   currentPage,
// }) {
//   const totalPages = Math.ceil(totalProducts / productsPerPage);
//   {
//     /*Calculate total number of pages */
//   }
//   const pageNumbers = [];

//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <div className="flex space-x-2 justify-center font-bold text-2xl">
//       {pageNumbers.map((number) => (
//         <Link href={`/?page=${number}`} key={number}>
//           <div
//             className={`p-2 text-gray-600 ${currentPage === number ? "text-orange-500" : ""}`}
//           >
//             {number}
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// }

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span className="px-4 py-2">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}