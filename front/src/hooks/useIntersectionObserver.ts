import { useState, useEffect, RefObject } from 'react';

interface IntersectionObserverOptions {
  ref: RefObject<Element>;
  threshold?: number;
  rootMargin?: string;
}

export const useIntersectionObserver = ({
  ref,
  threshold = 0.1,
  rootMargin = '0px',
}: IntersectionObserverOptions): boolean => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Quand l'élément entre dans le viewport
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasBeenVisible(true);
        } 
        // Quand l'élément quitte le viewport ET a déjà été visible auparavant
        else if (hasBeenVisible) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, threshold, rootMargin, hasBeenVisible]);

  return isVisible;
};