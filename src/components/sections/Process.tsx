import React, { useRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useLocale } from '../../contexts/LocaleContext';
import { classNames } from '../../utils/classNames';
import { FileText, Brain, Calculator, Bot, BarChart, Package } from 'lucide-react';

const ProcessCard = ({ 
  number, 
  title, 
  description, 
  icon: Icon,
  isVisible,
  delay,
}: { 
  number: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number }>;
  isVisible: boolean;
  delay: number;
}) => {
  return (
    <div 
      className={classNames(
        'card-3d-neon w-full sm:w-[220px] h-auto sm:h-[240px] flex flex-col items-center text-center p-6 opacity-0',
        isVisible ? 'scale-rotate-in' : ''
      )}
      style={{ 
        animationDelay: `${delay}ms`,
        // Réinitialiser l'animation quand non visible
        animation: isVisible ? 'scale-rotate-in 0.6s ease forwards' : 'none'
      }}
    >
      <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-accent text-primary-dark font-bold text-xl">
        <Icon size={24} />
      </div>
      <h4 className="text-lg font-bold mb-2 text-accent">{title}</h4>
      <p className="text-text-light/90 text-sm">{description}</p>
    </div>
  );
};

export const Process = () => {
  const { t } = useLocale();
  const processRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver({ ref: processRef });

  const icons = [FileText, Brain, Calculator, Bot, BarChart, Package];
  const baseDelay = 100;
  
  return (
    <section id="process" className="py-20 relative overflow-hidden" ref={processRef}>
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-accent mb-4">{t.process.title}</h2>
          <p className="text-text-light/90">{t.process.intro}</p>
        </div>

        <div className="flex flex-col items-center">
          {/* Première rangée de cartes */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 mb-12 sm:mb-16">
            <ProcessCard 
              number={1} 
              title={t.process.steps[0].title} 
              description={t.process.steps[0].description}
              icon={icons[0]}
              isVisible={isVisible}
              delay={baseDelay}
            />
            
            <ProcessCard 
              number={2} 
              title={t.process.steps[1].title} 
              description={t.process.steps[1].description}
              icon={icons[1]} 
              isVisible={isVisible}
              delay={baseDelay + 150}
            />
            
            <ProcessCard 
              number={3} 
              title={t.process.steps[2].title} 
              description={t.process.steps[2].description}
              icon={icons[2]}
              isVisible={isVisible}
              delay={baseDelay + 300}
            />
          </div>
          
          {/* Deuxième rangée de cartes */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
            <ProcessCard 
              number={4} 
              title={t.process.steps[3].title} 
              description={t.process.steps[3].description}
              icon={icons[3]}
              isVisible={isVisible}
              delay={baseDelay + 450}
            />
            
            <ProcessCard 
              number={5} 
              title={t.process.steps[4].title} 
              description={t.process.steps[4].description}
              icon={icons[4]}
              isVisible={isVisible}
              delay={baseDelay + 600}
            />
            
            <ProcessCard 
              number={6} 
              title={t.process.steps[5].title} 
              description={t.process.steps[5].description}
              icon={icons[5]}
              isVisible={isVisible}
              delay={baseDelay + 750}
            />
          </div>
        </div>
      </div>
    </section>
  );
};