export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  stock: number;
  category: string;
  description: string;
  image: string;
  rating?: number;
  isNew?: boolean;
  isTop?: boolean;
}

export interface User {
  id: number;
  fullname: string;
  phone: string;
}

export interface Borrow {
  id: number;
  userId: number;
  bookId: number;
  borrowDate: string;
}
