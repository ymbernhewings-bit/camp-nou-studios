import { useState, useEffect } from "react";

type HeroSlideshowProps = {
  images: string[];
  className?: string;
};

const HeroSlideshow = ({ images, className }: HeroSlideshowProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<boolean[]>([]);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  // Test if images actually exist
  useEffect(() => {
    console.log("Testing image loading...");
    const testImages = async () => {
      const results = await Promise.all(
        images.map(async (src, index) => {
          try {
            const img = new Image();
            const loadPromise = new Promise<boolean>((resolve) => {
              img.onload = () => {
                console.log(`✅ Image ${index} loaded successfully: ${src}`);
                setDebugInfo(prev => [...prev, `✅ Image ${index}: ${src} - LOADED`]);
                resolve(true);
              };
              img.onerror = () => {
                console.log(`❌ Image ${index} failed to load: ${src}`);
                setDebugInfo(prev => [...prev, `❌ Image ${index}: ${src} - FAILED`]);
                resolve(false);
              };
            });
            img.src = src;
            return await loadPromise;
          } catch (error) {
            console.log(`❌ Image ${index} error: ${src}`, error);
            return false;
          }
        })
      );
      setLoadedImages(results);
      console.log("Image loading results:", results);
    };

    testImages();
  }, [images]);

  useEffect(() => {
    if (loadedImages.some(loaded => loaded)) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => {
          const nextIndex = prevIndex === images.length - 1 ? 0 : prevIndex + 1;
          console.log(`Changing slide from ${prevIndex} to ${nextIndex}`);
          return nextIndex;
        });
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [images.length, loadedImages]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Debug panel */}
      <div className="absolute top-4 left-4 z-50 bg-black/80 text-white p-4 text-xs max-w-sm">
        <div><strong>Debug Info:</strong></div>
        <div>Current Index: {currentImageIndex}</div>
        <div>Current Image: {images[currentImageIndex]}</div>
        <div>Total Images: {images.length}</div>
        <div><strong>Loading Status:</strong></div>
        {debugInfo.map((info, i) => (
          <div key={i}>{info}</div>
        ))}
      </div>
      
      {/* Try using img tags instead of background-image */}
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ zIndex: index === currentImageIndex ? 1 : 0 }}
        />
      ))}
      
      {/* Fallback gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500"
        style={{ zIndex: -1 }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center">
            <div className="text-2xl mb-4">🏠 Barcelona Apartments</div>
            <div>Images: {loadedImages.filter(Boolean).length}/{images.length} loaded</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlideshow;
