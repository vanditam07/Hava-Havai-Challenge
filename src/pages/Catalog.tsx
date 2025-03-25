
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/product";
import { fetchProducts } from "@/services/api";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import { Skeleton } from "@/components/ui/skeleton";

const ITEMS_PER_PAGE = 8;

const Catalog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['products', currentPage],
    queryFn: () => fetchProducts(currentPage, ITEMS_PER_PAGE),
  });
  
  useEffect(() => {
    if (data) {
      setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
    }
  }, [data]);
  
  const handlePageChange = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
  };
  
  // Render loading skeletons
  const renderSkeletons = () => {
    return Array(ITEMS_PER_PAGE).fill(0).map((_, index) => (
      <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm p-4">
        <Skeleton className="h-40 w-full mb-4" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <Skeleton className="h-4 w-1/3 mb-2" />
        <Skeleton className="h-10 w-full mt-4" />
      </div>
    ));
  };
  
  return (
    <Layout title="Catalogue">
      {error ? (
        <div className="text-center py-10">
          <p className="text-red-500 mb-2">Error loading products</p>
          <button 
            onClick={() => window.location.reload()} 
            className="text-shop-accent underline"
          >
            Try again
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isLoading 
              ? renderSkeletons()
              : data?.products.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))
            }
          </div>
          
          {!isLoading && (
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          )}
        </>
      )}
    </Layout>
  );
};

export default Catalog;
