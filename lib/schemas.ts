// lib/schemas.ts
import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "Product title is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  stock: z.string().min(1, "Product stock status is required"), // Dropdown value
  availableProduct: z.coerce.number().int().min(0, "Available product count must be a non-negative integer").optional(), // Image showed "Available Product" input
  image: z.any().optional(), // File upload handling is complex, keeping it optional/any for now or string if URL
});

export type ProductFormValues = z.infer<typeof productSchema>;
