// "use client";

// import { useRouter } from "next/navigation";
// /**
//  * A component that renders a dropdown filter for selecting a category.
//  * It updates the URL with the selected category while preserving other parameters.
//  *
//  * @param {Object} props - The component's props.
//  * @param {Array<string>} props.categories - An array of available categories.
//  * @param {string} props.selectedCategory - The currently selected category.
//  *
//  * @returns {JSX.Element} - The rendered dropdown filter component.
//  */
// const Filter = ({ categories, selectedCategory }) => {
//   const router = useRouter();

//   const handleCategoryChange = (e) => {
//     const category = e.target.value;
//     // Update URL with the selected category while preserving other parameters
//     const url = new URL(window.location.href);
//     url.searchParams.set("category", category);
//     router.push(url.toString());
//   };

//   return (
//     <select
//       value={selectedCategory}
//       onChange={handleCategoryChange}
//       className="border border-gray-300 rounded-lg h-6 w-13 text-center px-3 focus:outline-none focus:border-orange-500"
//     >
//       {categories.map((category) => (
//         <option key={category} value={category}>
//           {category}
//         </option>
//       ))}
//     </select>
//   );
// };

// export default Filter;

export default function CategoryList({ categories, selectedCategory, onCategorySelect }) {
  // Ensure categories is always an array
  const safeCategories = Array.isArray(categories) ? categories : [];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button
        className={`px-4 py-2 rounded ${
          !selectedCategory ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
        onClick={() => onCategorySelect(null)}
      >
        All
      </button>
      {safeCategories.map((category) => (
        <button
          key={category.id}
          className={`px-4 py-2 rounded ${
            selectedCategory === category.id ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => onCategorySelect(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}