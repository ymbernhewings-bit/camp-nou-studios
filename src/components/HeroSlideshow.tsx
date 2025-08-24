import { useState, useEffect } from "react";

type HeroSlideshowProps = {
  images: string[];
  className?: string;
};

const HeroSlideshow = ({ images, className }: HeroSlideshowProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // change every 4s

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
};

export default HeroSlideshow;
