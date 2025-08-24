import { useState, useEffect } from "react";

type HeroSlideshowProps = {
  images: string[];
  className?: string;
};

const HeroSlideshow = ({ images, className }: HeroSlideshowProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Debug logging
  useEffect(() => {
    console.log("HeroSlideshow mounted with images:", images);
  }, []);

  useEffect(() => {
    console.log("Setting up interval for slideshow");
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex = prevIndex === images.length - 1 ? 0 : prevIndex + 1;
        console.log(`Changing slide from ${prevIndex} to ${nextIndex}`);
        return nextIndex;
      });
    }, 4000);

    return () => {
      console.log("Cleaning up slideshow interval");
      clearInterval(interval);
    };
  }, [images.length]);

  // Debug current state
  useEffect(() => {
    console.log(`Current image index: ${currentImageIndex}, showing: ${images[currentImageIndex]}`);
  }, [currentImageIndex, images]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Debug info - remove this after fixing */}
      <div className="absolute top-4 left-4 z-50 bg-black/50 text-white p-2 text-xs">
        Debug: Index {currentImageIndex}, Image: {images[currentImageIndex]}
      </div>
      
      {images.map((image, index) => {
        console.log(`Rendering image ${index}: ${image}, visible: ${index === currentImageIndex}`);
        return (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${image})` }}
            onLoad={() => console.log(`Image loaded: ${image}`)}
            onError={() => console.log(`Image failed to load: ${image}`)}
          />
        );
      })}
      
      {/* Fallback content */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center">
            <div>Slideshow Debug Mode</div>
            <div>Current: {currentImageIndex + 1} of {images.length}</div>
            <div>Image: {images[currentImageIndex]}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlideshow;
