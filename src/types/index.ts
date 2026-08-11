export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  _id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: string;
  categoryId: string;
  category?: Category;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "CUSTOMER";
}

export interface Order {
  id: string;
  quantity: number;
  totalPrice: number;
  status: "PENDING" | "PROCESSING" | "DELIVERED" | "CANCELLED";
  product?: Product;
  user?: User;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}
