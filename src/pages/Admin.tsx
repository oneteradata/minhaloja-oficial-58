
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Package, ShoppingBag, Star, Image, Grid3X3, Truck, MessageSquare } from "lucide-react";
import SiteSettingsAdmin from '@/components/admin/SiteSettingsAdmin';
import ProductsAdmin from '@/components/admin/ProductsAdmin';
import CategoriesAdmin from '@/components/admin/CategoriesAdmin';
import OrdersAdmin from '@/components/admin/OrdersAdmin';
import ReviewsAdmin from '@/components/admin/ReviewsAdmin';
import BannersAdmin from '@/components/admin/BannersAdmin';

const Admin = () => {
  const [activeTab, setActiveTab] = useState("settings");

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
          <p className="text-gray-600 mt-2">Gerencie todos os aspectos da sua loja</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-6 lg:grid-cols-6 w-full">
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden md:inline">Configurações</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Grid3X3 className="h-4 w-4" />
              <span className="hidden md:inline">Categorias</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden md:inline">Produtos</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden md:inline">Pedidos</span>
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span className="hidden md:inline">Avaliações</span>
            </TabsTrigger>
            <TabsTrigger value="banners" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              <span className="hidden md:inline">Banners</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="settings">
            <SiteSettingsAdmin />
          </TabsContent>

          <TabsContent value="categories">
            <CategoriesAdmin />
          </TabsContent>

          <TabsContent value="products">
            <ProductsAdmin />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersAdmin />
          </TabsContent>

          <TabsContent value="reviews">
            <ReviewsAdmin />
          </TabsContent>

          <TabsContent value="banners">
            <BannersAdmin />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
