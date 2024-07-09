import { useState, useEffect } from 'react';
import Image from 'next/image';
import pic1 from '../public/photos/pic1.jpg';
import pic2 from '../public/photos/pic2.jpg';
import pic3 from '../public/photos/pic3.webp';
import pic4 from '../public/photos/pic4.webp';
import pic5 from '../public/photos/pic5.webp';

const images = [pic1, pic2, pic3, pic4, pic5]; // Replace with your actual images

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 5000);  
    return () => clearInterval(interval);  
  }, [currentIndex]);

  return (
    <div className="relative pt-30 w-full" data-carousel="slide">
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-700 ease-in-out transform ${
              index === currentIndex ? 'translate-x-0' : (index > currentIndex ? 'translate-x-full' : '-translate-x-full')
            }`}
            style={{ transitionDuration: '700ms' }}
          >
            <Image src={img} className="block w-full h-full object-cover" alt="..." layout="fill" />
          </div>
        ))}
      </div>
      <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 z-0 rounded-full ${currentIndex === index ? 'bg-yellow-600' : 'bg-gray-300'}`}
            aria-current={currentIndex === index}
            aria-label={`Slide ${index + 1}`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
       
    </div>
  );
};

export default Carousel;
