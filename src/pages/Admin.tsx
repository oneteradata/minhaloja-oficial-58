
import React, { useState } from 'react';
import { Package, Users, ShoppingBag, TrendingUp, Plus, Edit, Trash2 } from 'lucide-react';
import Header from '../components/Header';
import { useCart } from '../hooks/useCart';

const Admin = () => {
  const { getTotalItems } = useCart();
  
  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'iPhone 15 Pro Max 256GB',
      price: 8999.99,
      stock: 25,
      category: 'Smartphone',
      status: 'Ativo'
    },
    {
      id: '2',
      name: 'Samsung Galaxy S24 Ultra',
      price: 7499.99,
      stock: 18,
      category: 'Smartphone',
      status: 'Ativo'
    }
  ]);

  const [orders] = useState([
    {
      id: '#001',
      customer: 'João Silva',
      date: '15/12/2024',
      total: 8999.99,
      status: 'Processando'
    },
    {
      id: '#002',
      customer: 'Maria Santos',
      date: '14/12/2024',
      total: 7499.99,
      status: 'Entregue'
    }
  ]);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [showProductForm, setShowProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    stock: '',
    category: 'Smartphone'
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const product = {
      id: Date.now().toString(),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      category: newProduct.category,
      status: 'Ativo'
    };
    setProducts([...products, product]);
    setNewProduct({ name: '', price: '', stock: '', category: 'Smartphone' });
    setShowProductForm(false);
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemsCount={getTotalItems()} />
      
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900">Painel Admin</h2>
          </div>
          <nav className="mt-6">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full text-left px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : ''
              }`}
            >
              <TrendingUp className="inline h-5 w-5 mr-3" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full text-left px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                activeTab === 'products' ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : ''
              }`}
            >
              <Package className="inline h-5 w-5 mr-3" />
              Produtos
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                activeTab === 'orders' ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : ''
              }`}
            >
              <ShoppingBag className="inline h-5 w-5 mr-3" />
              Pedidos
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`w-full text-left px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                activeTab === 'customers' ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : ''
              }`}
            >
              <Users className="inline h-5 w-5 mr-3" />
              Clientes
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === 'dashboard' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Vendas Hoje</p>
                      <p className="text-2xl font-bold text-gray-900">R$ 25.430</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Pedidos</p>
                      <p className="text-2xl font-bold text-gray-900">47</p>
                    </div>
                    <ShoppingBag className="h-8 w-8 text-blue-500" />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Produtos</p>
                      <p className="text-2xl font-bold text-gray-900">{products.length}</p>
                    </div>
                    <Package className="h-8 w-8 text-purple-500" />
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Clientes</p>
                      <p className="text-2xl font-bold text-gray-900">1.234</p>
                    </div>
                    <Users className="h-8 w-8 text-orange-500" />
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Pedidos Recentes</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b">
                        <th className="pb-2 font-medium text-gray-600">Pedido</th>
                        <th className="pb-2 font-medium text-gray-600">Cliente</th>
                        <th className="pb-2 font-medium text-gray-600">Data</th>
                        <th className="pb-2 font-medium text-gray-600">Total</th>
                        <th className="pb-2 font-medium text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b">
                          <td className="py-3">{order.id}</td>
                          <td className="py-3">{order.customer}</td>
                          <td className="py-3">{order.date}</td>
                          <td className="py-3">R$ {order.total.toFixed(2)}</td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === 'Entregue' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
                <button
                  onClick={() => setShowProductForm(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Adicionar Produto</span>
                </button>
              </div>

              {showProductForm && (
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <h2 className="text-xl font-semibold mb-4">Novo Produto</h2>
                  <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Nome do produto"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Preço"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="number"
                      placeholder="Estoque"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Smartphone">Smartphone</option>
                      <option value="Tablet">Tablet</option>
                      <option value="Notebook">Notebook</option>
                      <option value="Acessório">Acessório</option>
                    </select>
                    <div className="md:col-span-2 flex space-x-4">
                      <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                      >
                        Salvar
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowProductForm(false)}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 font-medium text-gray-600">Produto</th>
                      <th className="px-6 py-3 font-medium text-gray-600">Preço</th>
                      <th className="px-6 py-3 font-medium text-gray-600">Estoque</th>
                      <th className="px-6 py-3 font-medium text-gray-600">Categoria</th>
                      <th className="px-6 py-3 font-medium text-gray-600">Status</th>
                      <th className="px-6 py-3 font-medium text-gray-600">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b">
                        <td className="px-6 py-4">{product.name}</td>
                        <td className="px-6 py-4">R$ {product.price.toFixed(2)}</td>
                        <td className="px-6 py-4">{product.stock}</td>
                        <td className="px-6 py-4">{product.category}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            {product.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-700">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => deleteProduct(product.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Pedidos</h1>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 font-medium text-gray-600">Pedido</th>
                      <th className="px-6 py-3 font-medium text-gray-600">Cliente</th>
                      <th className="px-6 py-3 font-medium text-gray-600">Data</th>
                      <th className="px-6 py-3 font-medium text-gray-600">Total</th>
                      <th className="px-6 py-3 font-medium text-gray-600">Status</th>
                      <th className="px-6 py-3 font-medium text-gray-600">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b">
                        <td className="px-6 py-4">{order.id}</td>
                        <td className="px-6 py-4">{order.customer}</td>
                        <td className="px-6 py-4">{order.date}</td>
                        <td className="px-6 py-4">R$ {order.total.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                            <option value={order.status}>{order.status}</option>
                            <option value="Processando">Processando</option>
                            <option value="Enviado">Enviado</option>
                            <option value="Entregue">Entregue</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-blue-600 hover:text-blue-700 text-sm">
                            Ver Detalhes
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-8">Clientes</h1>
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-600">Lista de clientes será implementada aqui.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
