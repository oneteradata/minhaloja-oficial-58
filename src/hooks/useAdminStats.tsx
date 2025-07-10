import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminStats {
  totalProducts: number;
  totalOrders: number;
  totalSales: number;
  todaySales: number;
  pendingOrders: number;
}

export const useAdminStats = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalSales: 0,
    todaySales: 0,
    pendingOrders: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      // Get products count
      const { count: productsCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      // Get orders count and total sales
      const { data: ordersData } = await supabase
        .from('orders')
        .select('total_amount, created_at, status');

      // Get today's sales
      const today = new Date().toISOString().split('T')[0];
      const { data: todayOrders } = await supabase
        .from('orders')
        .select('total_amount')
        .gte('created_at', today)
        .lt('created_at', `${today}T23:59:59.999Z`);

      // Get pending orders count
      const { count: pendingCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      const totalSales = ordersData?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;
      const todaySales = todayOrders?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0;

      setStats({
        totalProducts: productsCount || 0,
        totalOrders: ordersData?.length || 0,
        totalSales,
        todaySales,
        pendingOrders: pendingCount || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return {
    stats,
    loading,
    refreshStats: fetchStats
  };
};