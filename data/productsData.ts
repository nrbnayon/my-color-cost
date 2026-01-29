import { Product } from "@/types/product";

export const productsData: Product[] = Array.from({ length: 24 }).map((_, index) => ({
  id: (index + 1).toString(),
  title: "Modern Light Clothes",
  price: 28.05,
  currency: "£",
  image: "/images/product-placeholder.png", // We will need a placeholder or ensure this exists
  stock: "Classy", // From image dropdown 'Select product stock' -> maybe it's status or type? Or number. Image shows "Classy"? No, image shows "Select product stock" and dropdown. Let's assume numeric or string status. The image card has rating and reviews. Let's use a number for stock in logic but string for form if complex.
  rating: 4,
  reviewsCount: 131,
  description: "A wonderful modern light cloth.",
}));
