// src/data/Carousel.ts
export interface CarouselSlide {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link: string;
  buttonText?: string;
}

export const CarouselSlides: CarouselSlide[] = [
  {
    id: 'slide-1',
    title: 'Climate Smart Farming',
    subtitle: 'Empowering NY farmers with data-driven tools',
    image: '/header-bg.jpg', // Same image as header - continuation effect
    link: '/about',
    buttonText: 'LEARN MORE'
  },
  {
    id: 'slide-2',
    title: 'Decision Support Tools',
    subtitle: 'Make informed choices for your farm',
    image: '/carousel-2.JPG',
    link: '/tools',
    buttonText: 'EXPLORE TOOLS'
  },
  {
    id: 'slide-3',
    title: 'Climate Adaptation Programs',
    subtitle: 'Training and resources for farmers',
    image: '/carousel-3.jpeg',
    link: '/programs',
    buttonText: 'VIEW PROGRAMS'
  },
  {
    id: 'slide-4',
    title: 'Connect with the CSF Network',
    subtitle: 'Connect with farmers and advisors across the Northeast',
    image: '/carousel-4.jpeg',
    link: '/network',
    buttonText: 'Explore the CSF Network'
  },
  {
    id: 'slide-5',
    title: 'Latest Research & News',
    subtitle: 'Stay informed on climate impacts',
    image: '/carousel-4.jpeg', // Same as slide 4, different position
    link: '/news',
    buttonText: 'READ MORE'
  }
];
