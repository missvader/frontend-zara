import type { ProductDetail } from '@/types'

export const mockProductDetail: ProductDetail = {
  id: 'SMG-S24U',
  brand: 'Samsung',
  name: 'Galaxy S24 Ultra',
  basePrice: 1319,
  imageUrl: 'https://cdn.example.com/samsung-s24-ultra.jpg',
  description:
    'The Samsung Galaxy S24 Ultra is the pinnacle of mobile technology, featuring a built-in S Pen, an advanced 200MP camera system, and the powerful Snapdragon 8 Gen 3 processor.',
  rating: 4.8,
  specs: {
    screen: '6.8" Dynamic AMOLED 2X',
    resolution: '3088 x 1440 pixels',
    processor: 'Snapdragon 8 Gen 3',
    mainCamera: '200MP + 12MP + 10MP + 50MP',
    selfieCamera: '12MP',
    battery: '5000 mAh',
    os: 'Android 14',
    screenRefreshRate: '120Hz',
  },
  colorOptions: [
    {
      name: 'Titanium Black',
      hexCode: '#2d2d2d',
      imageUrl: 'https://cdn.example.com/samsung-s24-ultra-black.jpg',
    },
    {
      name: 'Titanium Gray',
      hexCode: '#8a8a8a',
      imageUrl: 'https://cdn.example.com/samsung-s24-ultra-gray.jpg',
    },
    {
      name: 'Titanium Violet',
      hexCode: '#6b5b7b',
      imageUrl: 'https://cdn.example.com/samsung-s24-ultra-violet.jpg',
    },
    {
      name: 'Titanium Yellow',
      hexCode: '#d4a017',
      imageUrl: 'https://cdn.example.com/samsung-s24-ultra-yellow.jpg',
    },
  ],
  storageOptions: [
    { capacity: '256 GB', price: 1319 },
    { capacity: '512 GB', price: 1439 },
    { capacity: '1 TB', price: 1679 },
  ],
  similarProducts: [
    {
      id: 'IPH-15PM',
      brand: 'Apple',
      name: 'iPhone 15 Pro Max',
      basePrice: 1469,
      imageUrl: 'https://cdn.example.com/iphone-15-pro-max.jpg',
    },
    {
      id: 'PIX-8P',
      brand: 'Google',
      name: 'Pixel 8 Pro',
      basePrice: 999,
      imageUrl: 'https://cdn.example.com/pixel-8-pro.jpg',
    },
    {
      id: 'XMI-14U',
      brand: 'Xiaomi',
      name: 'Xiaomi 14 Ultra',
      basePrice: 1299,
      imageUrl: 'https://cdn.example.com/xiaomi-14-ultra.jpg',
    },
    {
      id: 'SON-XP5',
      brand: 'Sony',
      name: 'Xperia 1 V',
      basePrice: 1399,
      imageUrl: 'https://cdn.example.com/xperia-1-v.jpg',
    },
  ],
}
