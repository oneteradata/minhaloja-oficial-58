import React from 'react';
import { X } from 'lucide-react';
import type { Tables } from '@/integrations/supabase/types';

type Order = Tables<'orders'>;
type OrderItem = Tables<'order_items'>;

interface OrderDetailsModalProps {
  order: Order | null;
  orderItems: OrderItem[];
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  orderItems,
  isOpen,
  onClose
}) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Detalhes do Pedido {order.order_number}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Informações do Cliente</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Nome:</span> {order.customer_name}</p>
                <p><span className="font-medium">Email:</span> {order.customer_email}</p>
                <p><span className="font-medium">Telefone:</span> {order.customer_phone}</p>
                <p><span className="font-medium">Endereço:</span> {order.customer_address}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Informações do Pedido</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Data:</span> {new Date(order.created_at).toLocaleDateString('pt-BR')}</p>
                <p><span className="font-medium">Status:</span> 
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    order.status === 'delivered' 
                      ? 'bg-green-100 text-green-800' 
                      : order.status === 'shipped'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status === 'pending' ? 'Pendente' :
                     order.status === 'processing' ? 'Processando' :
                     order.status === 'shipped' ? 'Enviado' :
                     order.status === 'delivered' ? 'Entregue' : order.status}
                  </span>
                </p>
                <p><span className="font-medium">Pagamento:</span> 
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    order.payment_status === 'paid' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.payment_status === 'pending' ? 'Pendente' :
                     order.payment_status === 'paid' ? 'Pago' :
                     order.payment_status === 'failed' ? 'Falhou' : order.payment_status}
                  </span>
                </p>
                {order.tracking_code && (
                  <p><span className="font-medium">Código de Rastreamento:</span> {order.tracking_code}</p>
                )}
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Itens do Pedido</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">Produto</th>
                    <th className="px-4 py-2 text-center">Quantidade</th>
                    <th className="px-4 py-2 text-right">Preço Unit.</th>
                    <th className="px-4 py-2 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="px-4 py-2">{item.product_name}</td>
                      <td className="px-4 py-2 text-center">{item.quantity}</td>
                      <td className="px-4 py-2 text-right">R$ {Number(item.product_price).toFixed(2)}</td>
                      <td className="px-4 py-2 text-right">R$ {Number(item.subtotal).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td colSpan={3} className="px-4 py-2 text-right font-semibold">Total:</td>
                    <td className="px-4 py-2 text-right font-bold text-lg">
                      R$ {Number(order.total_amount).toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;