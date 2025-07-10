-- Enable admin operations for products
CREATE POLICY "Admin can insert products" 
ON public.products 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admin can update products" 
ON public.products 
FOR UPDATE 
USING (true);

CREATE POLICY "Admin can delete products" 
ON public.products 
FOR DELETE 
USING (true);

-- Enable admin operations for categories
CREATE POLICY "Admin can insert categories" 
ON public.categories 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admin can update categories" 
ON public.categories 
FOR UPDATE 
USING (true);

CREATE POLICY "Admin can delete categories" 
ON public.categories 
FOR DELETE 
USING (true);

-- Enable admin operations for orders
CREATE POLICY "Admin can update orders" 
ON public.orders 
FOR UPDATE 
USING (true);

CREATE POLICY "Admin can delete orders" 
ON public.orders 
FOR DELETE 
USING (true);

-- Enable admin operations for order_items
CREATE POLICY "Admin can update order_items" 
ON public.order_items 
FOR UPDATE 
USING (true);

CREATE POLICY "Admin can delete order_items" 
ON public.order_items 
FOR DELETE 
USING (true);

-- Enable admin operations for banner_images
CREATE POLICY "Admin can insert banner_images" 
ON public.banner_images 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admin can update banner_images" 
ON public.banner_images 
FOR UPDATE 
USING (true);

CREATE POLICY "Admin can delete banner_images" 
ON public.banner_images 
FOR DELETE 
USING (true);

-- Enable admin operations for site_settings
CREATE POLICY "Admin can insert site_settings" 
ON public.site_settings 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Admin can update site_settings" 
ON public.site_settings 
FOR UPDATE 
USING (true);

CREATE POLICY "Admin can delete site_settings" 
ON public.site_settings 
FOR DELETE 
USING (true);