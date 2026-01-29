"use client";

import Image from "next/image";
import { Star, Edit2, Trash2 } from "lucide-react";
import { Product } from "@/types/product";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export default function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  // Generate stars array
  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating % 1 !== 0;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-[6px_6px_54px_0px_#0000000D] hover:shadow-sm transition-all duration-200 border-none flex flex-col h-full group">
      {/* Product Image */}
      <div className="relative aspect-square w-full mb-4 rounded-xl overflow-hidden bg-gray-50">
        {/* Placeholder logic if image is missing could go here, but next/image handles src */}
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Delete Button - Absolute positioned */}
         <button
          onClick={(e) => {
             e.stopPropagation();
             onDelete(product.id);
          }}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors shadow-sm opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 gap-2">
        <h3 className="font-semibold text-foreground text-lg line-clamp-1" title={product.title}>
          {product.title}
        </h3>
        
        {/* Price and Rating Row */}
        <div className="flex flex-col gap-1">
            <span className="text-primary font-bold text-lg">
                {product.currency}{product.price.toFixed(2)}
            </span>
             <div className="flex items-center gap-1">
                <div className="flex text-orange-400">
                    {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={cn(
                        "w-4 h-4",
                        i < Math.round(product.rating) ? "fill-current" : "text-gray-200"
                        )}
                    />
                    ))}
                </div>
                <span className="text-gray-400 text-sm">({product.reviewsCount})</span>
            </div>
        </div>

        {/* Action Button */}
        <div className="mt-auto pt-4">
            <button
                onClick={() => onEdit(product)}
                className="w-full py-2.5 px-4 bg-[#E2EAF8] text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
                {/* Image icon seems to be Edit Product text in button in Figma */}
                Edit Product
            </button>
        </div>
      </div>
    </div>
  );
}
