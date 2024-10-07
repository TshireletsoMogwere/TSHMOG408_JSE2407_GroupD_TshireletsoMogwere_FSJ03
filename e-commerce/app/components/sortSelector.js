export default function SortSelector({ onSort }) {
    return (
      <div className="flex items-center gap-2">
        <label htmlFor="sort" className="font-semibold">Sort by:</label>
        <select
          id="sort"
          onChange={(e) => {
            const [sortBy, sortOrder] = e.target.value.split('-');
            onSort(sortBy, sortOrder);
          }}
          className="px-4 py-2 border rounded"
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="title-asc">Name: A to Z</option>
          <option value="title-desc">Name: Z to A</option>
        </select>
      </div>
    );
  }