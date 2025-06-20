
import React, { useState } from 'react';
import Header from '../components/Header';
import HeroSlider from '../components/HeroSlider';
import ProductCard from '../components/ProductCard';
import ProductDetails from '../components/ProductDetails';
import Footer from '../components/Footer';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { toast } from 'sonner';

const Home = () => {
  const { addToCart, getTotalItems } = useCart();
  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductDetails, setShowProductDetails] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const handleAddToCart = (product: any) => {
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.sale_price || product.price,
      image: product.images?.[0] || 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
      category: product.categories?.name || 'Produto'
    };
    addToCart(cartProduct);
    toast.success(`${product.name} adicionado ao carrinho!`);
  };

  const handleViewDetails = (product: any) => {
    setSelectedProduct(product);
    setShowProductDetails(true);
  };

  const handleCloseDetails = () => {
    setShowProductDetails(false);
    setSelectedProduct(null);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryId(selectedCategoryId === categoryId ? null : categoryId);
    // Scroll to products section
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter products based on selected category
  const filteredProducts = selectedCategoryId 
    ? products?.filter(product => product.category_id === selectedCategoryId)
    : products;

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
          {categoriesLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6 text-center animate-pulse">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mx-auto"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories?.map((category) => (
                <div 
                  key={category.id} 
                  className={`bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-all cursor-pointer transform hover:scale-105 ${
                    selectedCategoryId === category.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.image_url ? (
                    <img 
                      src={category.image_url} 
                      alt={category.name}
                      className="w-16 h-16 object-cover rounded-full mx-auto mb-4"
                    />
                  ) : (
                    <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                      selectedCategoryId === category.id ? 'bg-blue-200' : 'bg-blue-100'
                    }`}>
                      <span className="text-blue-600 font-bold text-xl">
                        {category.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <h3 className={`font-semibold ${
                    selectedCategoryId === category.id ? 'text-blue-700' : 'text-gray-900'
                  }`}>
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {/* Clear filter button */}
          {selectedCategoryId && (
            <div className="text-center mt-6">
              <button
                onClick={() => setSelectedCategoryId(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Mostrar Todas as Categorias
              </button>
            </div>
          )}
        </div>
      </section>

      {/* All Products */}
      <section id="products-section" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {selectedCategoryId 
              ? `Produtos - ${categories?.find(cat => cat.id === selectedCategoryId)?.name || 'Categoria Selecionada'}`
              : 'Todos os Produtos'
            }
          </h2>
          {productsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="w-full h-64 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts && filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={{
                    id: product.id,
                    name: product.name,
                    price: product.sale_price || product.price,
                    image: product.images?.[0] || 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
                    category: product.categories?.name || 'Produto'
                  }}
                  onAddToCart={() => handleAddToCart(product)}
                  onViewDetails={() => handleViewDetails(product)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">
                {selectedCategoryId 
                  ? 'Nenhum produto encontrado nesta categoria.'
                  : 'Nenhum produto encontrado.'
                }
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          isOpen={showProductDetails}
          onClose={handleCloseDetails}
          onAddToCart={handleAddToCart}
        />
      )}

      <Footer />
    </div>
  );
};

export default Home;
