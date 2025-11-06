import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

export const api = axios.create({ baseURL: '/api' });

const mock = new AxiosMockAdapter(api, { delayResponse: 400 });

type Dish = { id: string; name: string; price: number; image: string; promo?: string };
const dishes: Dish[] = [
  { id: '1', name: 'Burger Drone', price: 6.5, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80', promo: 'Hot' },
  { id: '2', name: 'Pizza Sky', price: 8.9, image: 'https://images.unsplash.com/photo-1548365328-9f547fb09530?w=800&q=80' },
  { id: '3', name: 'Sushi Fly', price: 12.0, image: 'https://images.unsplash.com/photo-1544378730-8b5104b38c53?w=800&q=80', promo: 'New' },
];

let cart: { id: string; qty: number }[] = [];

mock.onGet('/dishes').reply(200, { items: dishes });
mock.onGet(/\/dishes\/\w+/).reply(config => {
  const id = config.url?.split('/').pop();
  const item = dishes.find(d => d.id === id);
  return item ? [200, item] : [404];
});

mock.onGet('/cart').reply(200, { cart });
mock.onPost('/cart').reply(config => {
  const { id, qty } = JSON.parse(config.data);
  const existing = cart.find(c => c.id === id);
  if (existing) existing.qty += qty; else cart.push({ id, qty });
  return [200, { cart }];
});
mock.onDelete(/\/cart\/\w+/).reply(config => {
  const id = config.url?.split('/').pop();
  cart = cart.filter(c => c.id !== id);
  return [200, { cart }];
});

mock.onPost('/checkout').reply(200, { orderId: 'ORD-' + Math.floor(Math.random() * 100000) });

mock.onGet('/drone/status').reply(() => {
  // simple simulated path
  const progress = Math.min(Date.now() % 100000 / 1000 / 10, 1);
  return [200, { etaMinutes: Math.ceil((1 - progress) * 15), progress }];
});


