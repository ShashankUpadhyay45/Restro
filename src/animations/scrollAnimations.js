import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initScrollAnimations = () => {
  // Respect prefers-reduced-motion
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Card staggered 3D entrances
  const cards = document.querySelectorAll('.gsap-3d-card');
  if (cards.length > 0) {
    gsap.fromTo(
      cards,
      {
        opacity: 0,
        scale: 0.85,
        rotateX: 25,
        z: -100
      },
      {
        opacity: 1,
        scale: 1,
        rotateX: 0,
        z: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cards[0].parentElement,
          start: 'top 85%'
        }
      }
    );
  }

  // Parallax elements
  const parallaxItems = document.querySelectorAll('.gsap-parallax');
  parallaxItems.forEach((item) => {
    const speed = parseFloat(item.getAttribute('data-speed') || '0.2');
    gsap.to(item, {
      y: () => -100 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: item,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });
};
