interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  currency: 'HUF' | string; // Ha a HUF fix, érdemes lehet string literált használni
  stock: number;
  rating: number;
  active: boolean;
  description: string;
  image: string;
}