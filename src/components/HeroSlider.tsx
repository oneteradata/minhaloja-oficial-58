
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useBanners } from '../hooks/useBanners';

const HeroSlider = () => {
  const { data: banners, isLoading } = useBanners();
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const nextSlide = () => {
    if (banners && banners.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }
  };

  const prevSlide = () => {
    if (banners && banners.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    }
  };

  React.useEffect(() => {
    if (banners && banners.length > 1) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [banners]);

  if (isLoading) {
    return (
      <div className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  if (!banners || banners.length === 0) {
    return (
      <div className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
        <div className="text-white text-center max-w-2xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Bem-vindo à nossa loja
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Os melhores eletrônicos com preços incríveis
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-96 overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 
            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat flex items-center"
            style={{ 
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${banner.image_url})` 
            }}
          >
            <div className="container mx-auto px-4 text-white">
              <div className="max-w-2xl">
                {banner.title && (
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    {banner.title}
                  </h1>
                )}
                {banner.subtitle && (
                  <p className="text-xl md:text-2xl mb-8">
                    {banner.subtitle}
                  </p>
                )}
                {banner.button_text && banner.button_link && (
                  <a
                    href={banner.button_link}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors inline-block"
                  >
                    {banner.button_text}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {banners.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HeroSlider;
