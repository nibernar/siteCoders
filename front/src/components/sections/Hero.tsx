
import React, { useRef, useEffect, useState } from 'react';
import { useLocale } from '../../contexts/LocaleContext';
import { Button } from '../ui/Button';
import { Code } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { classNames } from '../../utils/classNames';

export const Hero = () => {
  const { t } = useLocale();
  const heroRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver({ ref: heroRef, rootMargin: "-10% 0px" });
  const [animationKey, setAnimationKey] = useState(0);

  // Réinitialiser les animations lorsque la visibilité change
  useEffect(() => {
    if (isVisible) {
      setAnimationKey(prev => prev + 1);
    }
  }, [isVisible]);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="relative pt-32 pb-20 lg:min-h-screen lg:flex lg:items-center overflow-hidden" 
      ref={heroRef}
    >
      {/* Arrière-plan SVG - Éléments abstraits semblables à du code */}
      <div className="absolute inset-0 opacity-10 select-none pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 border border-accent rounded-full"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 border border-accent/50 rounded-full"></div>
        <div className="absolute top-1/4 right-1/3 w-32 h-32 border border-accent/30 rounded-full"></div>
        
        {/* Motifs de type code */}
        <div className="absolute top-40 left-1/4 text-accent/20 text-5xl font-mono">{'{'}</div>
        <div className="absolute bottom-1/3 right-1/4 text-accent/20 text-5xl font-mono">{'}'}</div>
        <div className="absolute top-1/2 left-20 text-accent/20 text-4xl font-mono">{'<>'}</div>
        <div className="absolute bottom-1/4 right-10 text-accent/20 text-4xl font-mono">{'</>'}</div>
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 
            key={`title-${animationKey}`} 
            className={classNames(
              'mb-6',
              isVisible ? 'animate-fade-in-up' : 'opacity-0'
            )}
            style={{animationDelay: '0.2s'}}
          >
            <span className="neon-text-strong">CODERS<span className="text-text-light">🤖</span></span>
          </h1>
          
          <p 
            key={`subtitle-${animationKey}`} 
            className={classNames(
              'text-lg md:text-xl text-text-light/90 mb-8',
              isVisible ? 'animate-fade-in-up' : 'opacity-0'
            )} 
            style={{animationDelay: '0.4s'}}
          >
            {t.hero.subtitle}
          </p>
          
          <div 
            key={`buttons-${animationKey}`} 
            className={classNames(
              'flex flex-col sm:flex-row items-center justify-center gap-4',
              isVisible ? 'animate-fade-in-up' : 'opacity-0'
            )} 
            style={{animationDelay: '0.6s'}}
          >
            <Button size="lg" onClick={() => document.getElementById('process')?.scrollIntoView()}>
              {t.hero.cta}
            </Button>
            
            <Button variant="outline" size="lg" onClick={scrollToContact}>
              {t.header.cta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};