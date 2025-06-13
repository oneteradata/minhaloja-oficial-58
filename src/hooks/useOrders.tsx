
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (
              name,
              images
            )
          )
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (orderData: {
      customer_name: string;
      customer_email: string;
      customer_phone: string;
      customer_address: string;
      total_amount: number;
      items: Array<{
        product_id: string;
        product_name: string;
        product_price: number;
        quantity: number;
        subtotal: number;
      }>;
    }) => {
      // Gerar número do pedido
      const orderNumber = `PED${Date.now()}`;
      
      // Criar pedido
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
          customer_name: orderData.customer_name,
          customer_email: orderData.customer_email,
          customer_phone: orderData.customer_phone,
          customer_address: orderData.customer_address,
          total_amount: orderData.total_amount,
        })
        .select()
        .single();
      
      if (orderError) throw orderError;
      
      // Criar itens do pedido
      const orderItems = orderData.items.map(item => ({
        ...item,
        order_id: order.id,
      }));
      
      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);
      
      if (itemsError) throw itemsError;
      
      return order;
    },
    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success(`Pedido ${order.order_number} criado com sucesso!`);
    },
    onError: (error) => {
      console.error('Erro ao criar pedido:', error);
      toast.error('Erro ao criar pedido. Tente novamente.');
    }
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ orderId, status, paymentStatus, trackingCode }: {
      orderId: string;
      status?: string;
      paymentStatus?: string;
      trackingCode?: string;
    }) => {
      const updateData: any = {};
      
      if (status) updateData.status = status;
      if (paymentStatus) updateData.payment_status = paymentStatus;
      if (trackingCode) updateData.tracking_code = trackingCode;
      
      const { error } = await supabase
        .from('orders')
        .update(updateData)
        .eq('id', orderId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Pedido atualizado com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao atualizar pedido:', error);
      toast.error('Erro ao atualizar pedido.');
    }
  });
};
