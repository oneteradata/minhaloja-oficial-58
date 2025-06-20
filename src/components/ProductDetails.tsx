
import React from 'react';
import { X, Star, ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  sale_price?: number;
  images?: string[];
  category?: string;
  specifications?: any;
  stock: number;
}

interface ProductDetailsProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetails = ({ product, isOpen, onClose, onAddToCart }: ProductDetailsProps) => {
  if (!isOpen) return null;

  const currentPrice = product.sale_price || product.price;
  const hasDiscount = product.sale_price && product.sale_price < product.price;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Imagem do produto */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.images?.[0] || 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.slice(1, 5).map((image, index) => (
                    <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`${product.name} ${index + 2}`}
                        className="w-full h-full object-cover cursor-pointer hover:opacity-80"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Informações do produto */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">(0 avaliações)</span>
                </div>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-3xl font-bold text-blue-600">
                    R$ {currentPrice.toFixed(2)}
                  </div>
                  {hasDiscount && (
                    <div className="text-xl text-gray-500 line-through">
                      R$ {product.price.toFixed(2)}
                    </div>
                  )}
                </div>

                <p className="text-gray-600 mb-4">
                  Estoque: {product.stock > 0 ? `${product.stock} unidades` : 'Indisponível'}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Descrição</h3>
                <p className="text-gray-700">
                  {product.description || 'Produto de alta qualidade com excelente custo-benefício.'}
                </p>
              </div>

              {product.specifications && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Especificações</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-200 last:border-b-0">
                        <span className="font-medium text-gray-700">{key}:</span>
                        <span className="text-gray-600">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  onAddToCart({
                    id: product.id,
                    name: product.name,
                    price: currentPrice,
                    image: product.images?.[0] || 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop',
                    category: product.category || 'Produto'
                  });
                  onClose();
                }}
                disabled={product.stock <= 0}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 text-lg font-semibold transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>{product.stock > 0 ? 'Adicionar ao Carrinho' : 'Indisponível'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
