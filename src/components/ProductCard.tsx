
import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: any) => void;
}

const ProductCard = ({ product, onAddToCart, onViewDetails }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <div 
        className="relative overflow-hidden cursor-pointer"
        onClick={() => onViewDetails(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 
          className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-blue-600"
          onClick={() => onViewDetails(product)}
        >
          {product.name}
        </h3>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < 4 // Rating padrão de 4 estrelas
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">(0)</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">
            R$ {product.price.toFixed(2)}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Comprar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
