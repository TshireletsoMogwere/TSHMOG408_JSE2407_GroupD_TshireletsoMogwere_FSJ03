
export default function SkeletonLoader() {
    return(
    <div className="animate-pulse flex flex-col items-center">
      <div className="bg-gray-300 w-full h-48 rounded-md"></div> {/* Placeholder for image */}
      <div className="mt-4 bg-gray-300 w-3/4 h-4 rounded-md"></div> {/* Placeholder for title */}
      <div className="mt-2 bg-gray-300 w-1/2 h-4 rounded-md"></div> {/* Placeholder for price */}
    </div>
    )
};
