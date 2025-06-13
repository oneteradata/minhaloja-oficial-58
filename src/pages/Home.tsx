import React, { useState } from 'react';
import Header from '../components/Header';
import HeroSlider from '../components/HeroSlider';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { useCart } from '../hooks/useCart';
import { toast } from 'sonner';

const Home = () => {
  const { addToCart, getTotalItems } = useCart();

  // Dados mock dos produtos
  const [products] = useState([
    {
      id: '1',
      name: 'iPhone 15 Pro Max 256GB',
      price: 8999.99,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
      rating: 4.8,
      reviews: 1247,
      category: 'Smartphone'
    },
    {
      id: '2',
      name: 'Samsung Galaxy S24 Ultra',
      price: 7499.99,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
      rating: 4.7,
      reviews: 892,
      category: 'Smartphone'
    },
    {
      id: '3',
      name: 'iPad Pro 12.9" M2',
      price: 6999.99,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop',
      rating: 4.9,
      reviews: 534,
      category: 'Tablet'
    },
    {
      id: '4',
      name: 'MacBook Air M2',
      price: 12999.99,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop',
      rating: 4.8,
      reviews: 726,
      category: 'Notebook'
    },
    {
      id: '5',
      name: 'AirPods Pro 2ª Geração',
      price: 1899.99,
      image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300&h=300&fit=crop',
      rating: 4.6,
      reviews: 1834,
      category: 'Acessório'
    },
    {
      id: '6',
      name: 'Apple Watch Series 9',
      price: 3499.99,
      image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=300&fit=crop',
      rating: 4.7,
      reviews: 965,
      category: 'Smartwatch'
    }
  ]);

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemsCount={getTotalItems()} />
      
      {/* Hero Slider */}
      <HeroSlider />

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Categorias Populares
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Smartphones', 'Tablets', 'Notebooks', 'Acessórios'].map((category) => (
              <div key={category} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-xl">
                    {category.charAt(0)}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900">{category}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Produtos em Destaque
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
