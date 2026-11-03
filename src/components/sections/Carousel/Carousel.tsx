// src/components/sections/Carousel/Carousel.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import type { CarouselSlide } from '../../../data/Carousel';
import styles from './Carousel.module.css';

interface CarouselProps {
  slides: CarouselSlide[];
  autoPlayInterval?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  autoPlayInterval = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, nextSlide]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  if (slides.length === 0) return null;

  const currentSlide = slides[currentIndex];

  // External links (http/https) open in a new tab via a plain anchor;
  // internal paths use the React Router Link.
  const isExternal = /^https?:\/\//i.test(currentSlide.link);

  // Get image position based on slide index
  const getImagePosition = (index: number) => {
    if (index === 0) return 'center 15%';  // First slide - aligned with header
    if (index === 4) return 'center top';   // Fifth slide - show top of image
    return 'center center';                  // All others - centered
  };

  return (
    <div
      className={styles.carousel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides */}
      <div className={styles.slidesContainer}>
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className={styles.slideImage}
              style={{ objectPosition: getImagePosition(index) }}
            />
            <div className={styles.overlay}></div>
          </div>
        ))}
      </div>

      {/* Content - Lower Left */}
      <div className={styles.content}>
        <h2 className={styles.title}>{currentSlide.title}</h2>
        {currentSlide.subtitle && (
          <p className={styles.subtitle}>{currentSlide.subtitle}</p>
        )}
        {isExternal ? (
          <a
            href={currentSlide.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.button}
          >
            {currentSlide.buttonText || 'LEARN MORE'}
          </a>
        ) : (
          <Link to={currentSlide.link} className={styles.button}>
            {currentSlide.buttonText || 'LEARN MORE'}
          </Link>
        )}
      </div>

      {/* Navigation Arrows */}
      <button
        className={`${styles.arrow} ${styles.prevArrow}`}
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        className={`${styles.arrow} ${styles.nextArrow}`}
        onClick={nextSlide}
        aria-label="Next slide"
      >
        ›
      </button>

      {/* Dots Navigation */}
      <div className={styles.dots}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
