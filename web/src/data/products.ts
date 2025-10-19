export type Product = {
  id: string;
  name: string;
  price: number;
  image?: string;
  description: string;
  tag?: 'Hot' | 'New';
  category: 'Burger' | 'Pizza' | 'Sushi';
};

export const PLACEHOLDERS = {
  Burger: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=1200&q=80',
  Pizza: 'https://images.unsplash.com/photo-1601924582971-1c9d8c1e0d9b?w=1200&q=80',
  Sushi: 'https://images.unsplash.com/photo-1562158070-622a0c5145cf?w=1200&q=80',
};

export const products: Product[] = [
  {
    id: '1',
    name: 'Burger Drone',
    price: 6.5,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80',
    description: 'Juicy grilled burger with fresh lettuce and sauce.',
    tag: 'Hot',
    category: 'Burger',
  },
  {
    id: '2',
    name: 'Pizza Sky',
    price: 8.9,
    image: 'https://png.pngtree.com/thumb_back/fh260/background/20250205/pngtree-melting-pizza-slice-in-space-with-blue-and-red-background-image_16896342.jpg',
    description: 'Cheesy pepperoni pizza with tomato base.',
    tag: 'New',
    category: 'Pizza',
  },
  {
    id: '3',
    name: 'Sushi Fly',
    price: 12.0,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
    description: 'Fresh salmon sushi with soy sauce and wasabi.',
    category: 'Sushi',
  },
  {
    id: '4',
    name: 'Double Burger',
    price: 9.5,
    image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?w=800&q=80',
    description: 'Double beef burger with cheese and pickles.',
    category: 'Burger',
  },
  {
    id: '5',
    name: 'Pepperoni Lift',
    price: 10.5,
    image: 'https://thumbs.dreamstime.com/b/pepperoni-pizza-slice-lift-melted-cheese-box-pepperoni-pizza-slice-lift-melted-cheese-box-349528217.jpg?w=992',
    description: 'Crispy pepperoni pizza baked to perfection.',
    category: 'Pizza',
  },
  {
    id: '6',
    name: 'Rainbow Sushi',
    price: 14.2,
    image: 'https://th.bing.com/th/id/R.8b296e4ac3888bb6e70504928e6f8e24?rik=UvkyqeD4uJbR9g&pid=ImgRaw&r=0',
    description: 'Colorful sushi rolls with tuna, salmon, and avocado.',
    category: 'Sushi',
  },
];




export const getProductImage = (p: Product) => p.image || PLACEHOLDERS[p.category];

// ===== add at the bottom of src/data/products.ts =====
export const productNameMap: Record<string, string> = Object.fromEntries(
  products.map(p => [p.id, p.name])
);

export const productPriceMap: Record<string, number> = Object.fromEntries(
  products.map(p => [p.id, p.price])
);
