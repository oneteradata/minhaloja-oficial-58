
import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { useSiteSettings } from '../hooks/useSiteSettings';
import { useCategories } from '../hooks/useCategories';

const Footer = () => {
  const { data: siteSettings } = useSiteSettings();
  const { data: categories } = useCategories();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="text-xl font-bold">{siteSettings?.site_name || 'TechStore'}</span>
            </div>
            <p className="text-gray-300 mb-4">
              {siteSettings?.site_description || 'Sua loja de confiança para celulares e eletrônicos com os melhores preços e qualidade.'}
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-500 cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-pink-500 cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Produtos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ofertas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categorias</h3>
            <ul className="space-y-2 text-gray-300">
              {categories?.map((category) => (
                <li key={category.id}>
                  <a href="#" className="hover:text-white transition-colors">
                    {category.name}
                  </a>
                </li>
              )) || (
                <>
                  <li><a href="#" className="hover:text-white transition-colors">Smartphones</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Tablets</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Acessórios</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Eletrônicos</a></li>
                </>
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <div className="space-y-3 text-gray-300">
              {siteSettings?.contact_phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>{siteSettings.contact_phone}</span>
                </div>
              )}
              {siteSettings?.contact_email && (
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>{siteSettings.contact_email}</span>
                </div>
              )}
              {siteSettings?.address && (
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{siteSettings.address}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 {siteSettings?.site_name || 'TechStore'}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
