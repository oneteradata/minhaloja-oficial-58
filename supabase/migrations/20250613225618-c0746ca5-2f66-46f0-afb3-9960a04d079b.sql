
-- Tabela para configurações gerais do site
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  site_name TEXT NOT NULL DEFAULT 'Loja de Eletrônicos',
  logo_url TEXT,
  primary_color TEXT DEFAULT '#3B82F6',
  secondary_color TEXT DEFAULT '#1E40AF',
  whatsapp_number TEXT,
  whatsapp_message TEXT DEFAULT 'Olá! Gostaria de mais informações sobre os produtos.',
  contact_email TEXT,
  contact_phone TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela para categorias de produtos
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela para produtos
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  sale_price DECIMAL(10,2),
  stock INTEGER NOT NULL DEFAULT 0,
  category_id UUID REFERENCES public.categories(id),
  images TEXT[], -- Array de URLs das imagens
  specifications JSONB, -- Especificações técnicas em JSON
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela para pedidos
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method TEXT,
  tracking_code TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela para itens do pedido
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) NOT NULL,
  product_name TEXT NOT NULL, -- Nome do produto no momento da compra
  product_price DECIMAL(10,2) NOT NULL, -- Preço do produto no momento da compra
  quantity INTEGER NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela para avaliações
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela para imagens do slider/banner
CREATE TABLE public.banner_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  subtitle TEXT,
  image_url TEXT NOT NULL,
  button_text TEXT,
  button_link TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Inserir configurações padrão do site
INSERT INTO public.site_settings (site_name, whatsapp_number, whatsapp_message, contact_email, contact_phone, address)
VALUES (
  'TechStore - Eletrônicos',
  '5511999999999',
  'Olá! Vi seus produtos no site e gostaria de mais informações.',
  'contato@techstore.com',
  '(11) 99999-9999',
  'Rua das Tecnologias, 123 - São Paulo, SP'
);

-- Inserir categorias padrão
INSERT INTO public.categories (name, description, image_url, sort_order) VALUES
('Smartphones', 'Os melhores smartphones do mercado', null, 1),
('Tablets', 'Tablets para trabalho e entretenimento', null, 2),
('Notebooks', 'Notebooks e laptops de alta performance', null, 3),
('Acessórios', 'Acessórios para seus dispositivos', null, 4);

-- Inserir produtos de exemplo
INSERT INTO public.products (name, description, price, stock, category_id, images, specifications, is_featured) VALUES
(
  'iPhone 15 Pro Max 256GB',
  'O mais avançado iPhone com chip A17 Pro e câmera profissional',
  8999.99,
  25,
  (SELECT id FROM public.categories WHERE name = 'Smartphones' LIMIT 1),
  ARRAY['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500'],
  '{"tela": "6.7 polegadas", "memoria": "256GB", "camera": "48MP", "bateria": "4441mAh"}',
  true
),
(
  'Samsung Galaxy S24 Ultra',
  'Smartphone premium com S Pen e câmera de 200MP',
  7499.99,
  18,
  (SELECT id FROM public.categories WHERE name = 'Smartphones' LIMIT 1),
  ARRAY['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500'],
  '{"tela": "6.8 polegadas", "memoria": "256GB", "camera": "200MP", "bateria": "5000mAh"}',
  true
);

-- Inserir imagens padrão para o banner
INSERT INTO public.banner_images (title, subtitle, image_url, button_text, button_link, sort_order) VALUES
('Novos Lançamentos', 'Confira os smartphones mais recentes', 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200', 'Ver Produtos', '/products', 1),
('Ofertas Especiais', 'Descontos imperdíveis em eletrônicos', 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1200', 'Aproveitar', '/offers', 2);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banner_images ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para permitir leitura pública (produtos, categorias, etc.)
CREATE POLICY "Allow public read access to site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read access to categories" ON public.categories FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access to products" ON public.products FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access to approved reviews" ON public.reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Allow public read access to active banners" ON public.banner_images FOR SELECT USING (is_active = true);

-- Políticas para inserção pública (pedidos e avaliações)
CREATE POLICY "Allow public insert orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert order_items" ON public.order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert reviews" ON public.reviews FOR INSERT WITH CHECK (true);

-- Para o admin, permitir acesso total (será implementado com autenticação posteriormente)
CREATE POLICY "Allow all access to authenticated users" ON public.site_settings FOR ALL USING (true);
CREATE POLICY "Allow all access to categories for authenticated" ON public.categories FOR ALL USING (true);
CREATE POLICY "Allow all access to products for authenticated" ON public.products FOR ALL USING (true);
CREATE POLICY "Allow all access to orders for authenticated" ON public.orders FOR ALL USING (true);
CREATE POLICY "Allow all access to order_items for authenticated" ON public.order_items FOR ALL USING (true);
CREATE POLICY "Allow all access to reviews for authenticated" ON public.reviews FOR ALL USING (true);
CREATE POLICY "Allow all access to banners for authenticated" ON public.banner_images FOR ALL USING (true);
