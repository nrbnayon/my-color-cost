"use client";

import { useState } from "react";
import DashboardHeader from "@/components/Shared/DashboardHeader";
import ProductCard from "@/components/(Dashboard)/Products/ProductCard";
import { Pagination } from "@/components/Shared/Pagination";
import { DeleteConfirmationModal } from "@/components/Shared/DeleteConfirmationModal";
import { productsData } from "@/data/productsData";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { Plus } from "lucide-react";
import Image from "next/image";
import { ProductGridSkeleton } from "@/components/Skeleton/ProductGridSkeleton";
import { useEffect } from "react";

const ITEMS_PER_PAGE = 12;

export default function ProductsPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>(productsData);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  
  const handleDeleteClick = (id: string) => {
    setProductToDelete(id);
  };

  const handleConfirmDelete = async () => {
    if (productToDelete) {
      // Simulate API delete
      setProducts(prev => prev.filter(p => p.id !== productToDelete));
      setProductToDelete(null);
      toast.success("Product deleted successfully");
    }
  };

  const handleEditClick = (product: Product) => {
    router.push(`/products/${product.id}`);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <DashboardHeader 
        title="Product List" 
        onSearch={handleSearch}
      />

      <div className="p-4 md:p-8 flex flex-col gap-6">
        {/* Header Actions */}
        <div className="flex justify-end">
            <Link href="/products/add" className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-primary/20">
                <Plus className="w-5 h-5" />
                Add New Product
            </Link>
        </div>

        {/* Product Grid */}
        {isLoading ? (
             <ProductGridSkeleton count={ITEMS_PER_PAGE} />
        ) : paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEditClick}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>
        ) : (
            <div className="text-center py-20 text-gray-500 flex flex-col items-center gap-4">
              <Image src="/images/empty-state.webp" alt="Empty State" width={200} height={200} />
                No products found.
            </div>
        )}

        {/* Pagination */}
        {!isLoading && filteredProducts.length > ITEMS_PER_PAGE && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredProducts.length}
            itemsPerPage={ITEMS_PER_PAGE}
            currentItemsCount={paginatedProducts.length}
            className="mt-4 bg-white rounded-xl shadow-sm border-none"
          />
        )}
      </div>

      {/* Delete Modal */}
      <DeleteConfirmationModal
        isOpen={!!productToDelete}
        onClose={() => setProductToDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
      />
    </div>
  );
}
