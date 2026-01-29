export interface Product {
    id: string;
    title: string;
    price: number;
    currency: string;
    image: string;
    stock: number | string; // 'input' suggests string handling or number
    rating: number;
    reviewsCount: number;
    description?: string;
    category?: string;
    availableProduct?: number;
}
