-- Criar tabela de configurações do site
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  site_name TEXT NOT NULL DEFAULT 'Loja Eletrônicos',
  site_description TEXT,
  logo_url TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  whatsapp_number TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de banners/imagens do hero
CREATE TABLE public.banner_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT,
  subtitle TEXT,
  image_url TEXT NOT NULL,
  button_text TEXT,
  button_link TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de categorias
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de produtos
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  sale_price DECIMAL(10,2),
  images TEXT[] DEFAULT '{}',
  category_id UUID REFERENCES public.categories(id),
  specifications JSONB,
  stock INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de pedidos
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_address TEXT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  payment_status TEXT NOT NULL DEFAULT 'pending',
  tracking_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de itens do pedido
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_price DECIMAL(10,2) NOT NULL,
  quantity INTEGER NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Inserir dados iniciais
INSERT INTO public.site_settings (site_name, site_description, contact_phone, whatsapp_number) 
VALUES ('Loja Eletrônicos', 'Os melhores eletrônicos com preços incríveis', '(11) 99999-9999', '5511999999999');

INSERT INTO public.banner_images (title, subtitle, image_url, button_text, is_active, sort_order)
VALUES 
('Bem-vindo à nossa loja', 'Os melhores eletrônicos com preços incríveis', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop', 'Ver Produtos', true, 1);

INSERT INTO public.categories (name, description, is_active, sort_order)
VALUES 
('Smartphones', 'Celulares e acessórios', true, 1),
('Notebooks', 'Laptops e computadores portáteis', true, 2),
('Tablets', 'Tablets e iPads', true, 3),
('Acessórios', 'Cabos, capas e outros acessórios', true, 4);

-- Obter IDs das categorias para os produtos
WITH category_ids AS (
  SELECT id, name FROM public.categories
)
INSERT INTO public.products (name, description, price, sale_price, images, category_id, stock, is_active, is_featured)
SELECT 
  'iPhone 13 Pro',
  'iPhone 13 Pro com 128GB, câmera tripla e tela Super Retina XDR.',
  4999.00,
  4499.00,
  ARRAY['https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop'],
  c.id,
  50,
  true,
  true
FROM category_ids c WHERE c.name = 'Smartphones'
UNION ALL
SELECT 
  'MacBook Air M2',
  'MacBook Air com chip M2, 8GB RAM e 256GB SSD.',
  8999.00,
  7999.00,
  ARRAY['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop'],
  c.id,
  30,
  true,
  true
FROM category_ids c WHERE c.name = 'Notebooks'
UNION ALL
SELECT 
  'iPad Pro 11"',
  'iPad Pro 11 polegadas com chip M2 e tela Liquid Retina.',
  6999.00,
  NULL,
  ARRAY['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop'],
  c.id,
  25,
  true,
  false
FROM category_ids c WHERE c.name = 'Tablets';

-- Função para atualizar timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar timestamps
CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_banner_images_updated_at
  BEFORE UPDATE ON public.banner_images
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON public.categories
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banner_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para leitura pública (dados do catálogo)
CREATE POLICY "Public read access for site_settings" 
ON public.site_settings FOR SELECT USING (true);

CREATE POLICY "Public read access for banner_images" 
ON public.banner_images FOR SELECT USING (true);

CREATE POLICY "Public read access for categories" 
ON public.categories FOR SELECT USING (true);

CREATE POLICY "Public read access for products" 
ON public.products FOR SELECT USING (true);

CREATE POLICY "Public read access for orders" 
ON public.orders FOR SELECT USING (true);

CREATE POLICY "Public read access for order_items" 
ON public.order_items FOR SELECT USING (true);

-- Políticas para inserção de pedidos (público pode criar pedidos)
CREATE POLICY "Public insert access for orders" 
ON public.orders FOR INSERT WITH CHECK (true);

CREATE POLICY "Public insert access for order_items" 
ON public.order_items FOR INSERT WITH CHECK (true);