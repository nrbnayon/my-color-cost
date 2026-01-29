"use client";

import { use, useEffect, useState } from "react";
import ProductForm from "@/components/(Dashboard)/Products/ProductForm";
import { productsData } from "@/data/productsData";
import { Product } from "@/types/product";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    if (id) {
       // In a real app this would be an API call
       const found = productsData.find(p => p.id === id);
       setProduct(found);
    }
    setLoading(false);
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product && !loading) return <div>Product not found</div>;

  return (
    <div className="p-4 md:p-8">
      <ProductForm initialData={product} isEditing={true} />
    </div>
  );
}
