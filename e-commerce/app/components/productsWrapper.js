
import { Suspense } from 'react';
import SkeletonLoader from './productsSkeleton';
const ProductWrapper = ({ children }) => {
  return (
    <div>
      {/* Suspense wrapper to show loading UI */}
      <Suspense fallback={
        <div className="px-[2%] md:px-0 max-w-xl md:mx-auto grid gap-4 grid-cols-2 lg:grid-cols-5 justify-center md:grid-cols-3 lg:mx-[9%] items-center lg:max-w-none my-4">
          {Array(10).fill(0).map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
        </div>
      }>
        {children}
      </Suspense>
    </div>
  );
};

export default ProductWrapper;
