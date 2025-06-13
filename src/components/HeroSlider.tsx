
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=1200&h=400&fit=crop',
      title: 'iPhone 15 Pro Max',
      subtitle: 'Até 30% de desconto',
      cta: 'Ver Ofertas'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&h=400&fit=crop',
      title: 'Samsung Galaxy S24',
      subtitle: 'Lançamento exclusivo',
      cta: 'Comprar Agora'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=1200&h=400&fit=crop',
      title: 'iPad Pro M2',
      subtitle: 'Produtividade sem limites',
      cta: 'Saiba Mais'
    }
  ];

  return (
    <section className="relative w-full">
      <Carousel className="w-full" opts={{ align: "start", loop: true }}>
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-center text-white px-4">
                    <h2 className="text-3xl md:text-5xl font-bold mb-2">
                      {slide.title}
                    </h2>
                    <p className="text-lg md:text-xl mb-6 text-gray-200">
                      {slide.subtitle}
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
                      {slide.cta}
                    </button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </section>
  );
};

export default HeroSlider;
