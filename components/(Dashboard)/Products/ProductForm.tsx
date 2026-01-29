"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormValues } from "@/lib/schemas";
import { Product } from "@/types/product";
import { UploadCloud, ArrowLeft, X, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface ProductFormProps {
  initialData?: Product;
  isEditing?: boolean;
}

export default function ProductForm({ initialData, isEditing = false }: ProductFormProps) {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
        title: initialData?.title || "",
        price: initialData?.price || 0,
        stock: initialData?.stock?.toString() || "",
        availableProduct: initialData?.availableProduct || 0,
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form Data:", data);
      
      toast.success(isEditing ? "Product updated successfully!" : "Product created successfully!");
      router.push("/products");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size too large. Max 10MB.");
        return;
      }
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setValue("image", file);
    }
  };

  const removeImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImagePreview(null);
    setValue("image", undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
            <Link 
              href="/products" 
              className="p-2 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-foreground hover:border-gray-300 transition-all shadow-sm"
            >
                <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">
                  {isEditing ? "Edit Product" : "Create New Product"}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {isEditing ? "Update your product details and settings" : "Add a new product to your inventory"}
              </p>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Form */}
        <div className="lg:col-span-2 space-y-8">
          <form id="product-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            {/* General Information Card */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/50">
              <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                General Information
              </h2>
              
              <div className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Product Name</label>
                  <input
                    {...register("title")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400 font-medium"
                    placeholder="e.g., Modern Leather Sofa"
                  />
                  {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Price */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Price</label>
                    <div className="relative group">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold group-focus-within:text-primary transition-colors">£</span>
                        <input
                        type="number"
                        step="0.01"
                        {...register("price")}
                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400 font-medium"
                        placeholder="0.00"
                        />
                    </div>
                    {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
                  </div>

                  {/* Stock Status */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Stock Status</label>
                    <div className="relative">
                        <select
                            {...register("stock")}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none text-gray-600 font-medium cursor-pointer"
                        >
                            <option value="" disabled>Select status</option>
                            <option value="In Stock">In Stock</option>
                            <option value="Out of Stock">Out of Stock</option>
                            <option value="Classy">Low Stock</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.41 0.589996L6 5.17L10.59 0.589996L12 2L6 8L0 2L1.41 0.589996Z" fill="currentColor"/>
                            </svg>
                        </div>
                    </div>
                    {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
                  </div>
                </div>

                {/* Available Quantity */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Available Quantity</label>
                  <input
                    type="number"
                    {...register("availableProduct")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400 font-medium"
                    placeholder="Enter quantity"
                  />
                  {errors.availableProduct && <p className="text-red-500 text-sm">{errors.availableProduct.message}</p>}
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Right Column - Media & Actions */}
        <div className="space-y-8">
            {/* Media Upload */}
            <div className="bg-white p-6 rounded-3xl shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/50 h-fit">
              <h2 className="text-lg font-bold text-foreground mb-6">Product Media</h2>
              
              <div 
                onClick={triggerFileInput}
                className={cn(
                  "border-2 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 relative overflow-hidden group min-h-[300px]",
                  imagePreview 
                    ? "border-primary/20 bg-primary/5" 
                    : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"
                )}
              >
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/*" 
                  className="hidden"
                  onChange={handleImageChange}
                />
                
                {imagePreview ? (
                    <div className="relative w-full h-full min-h-[280px] flex items-center justify-center group-hover:opacity-90 transition-opacity">
                        <Image 
                          src={imagePreview} 
                          alt="Preview" 
                          fill 
                          className="object-contain p-2" 
                        />
                        
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
                           <p className="text-white font-medium">Click to replace</p>
                           <button 
                             onClick={removeImage}
                             className="p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-colors"
                           >
                             <X className="w-5 h-5" />
                           </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-4 py-8">
                      <div className="w-16 h-16 rounded-full bg-blue-50 text-primary flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                           <ImageIcon className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-base font-bold text-foreground">
                            Click to upload image
                        </p>
                        <p className="text-sm text-gray-500">
                            SVG, PNG, JPG or GIF (max. 10MB)
                        </p>
                      </div>
                    </div>
                )}
              </div>
            </div>

            {/* Actions Card */}
            <div className="bg-white p-6 rounded-3xl shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/50">
               <div className="flex flex-col gap-3">
                 <button
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                 >
                   {isSubmitting ? (
                     <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                   ) : isEditing ? "Save Changes" : "Publish Product"}
                 </button>
                 
                 <Link
                    href="/products" 
                    className="w-full py-3.5 px-6 rounded-xl border border-gray-200 text-center text-gray-600 font-bold hover:bg-gray-50 hover:border-gray-300 transition-all"
                 >
                    Discard Changes
                 </Link>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
}
