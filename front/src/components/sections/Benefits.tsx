import React, { useRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useLocale } from '../../contexts/LocaleContext';
import { classNames } from '../../utils/classNames';
import { DollarSign, Clock, Award, Target } from 'lucide-react';

const BenefitCard = ({ 
  icon, 
  title, 
  description, 
  isVisible,
  delay,
}: { 
  icon: React.ReactNode;
  title: string;
  description: string;
  isVisible: boolean;
  delay: number;
}) => {
  return (
    <div 
      className={classNames(
        'bg-primary p-6 rounded-xl transition-all duration-500 opacity-0 transform translate-y-10 neon-box',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-accent/20 text-accent">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-accent">{title}</h3>
      <p className="text-text-light/90">{description}</p>
    </div>
  );
};

export const Benefits = () => {
  const { t } = useLocale();
  const benefitsRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver({ ref: benefitsRef });

  const icons = [
    <DollarSign key="dollar" size={24} />,
    <Clock key="clock" size={24} />,
    <Award key="award" size={24} />,
    <Target key="target" size={24} />,
  ];

  return (
    <section id="benefits" className="py-20 bg-primary-dark" ref={benefitsRef}>
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-accent mb-4">{t.benefits.title}</h2>
          <p className="text-text-light/90">{t.benefits.intro}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.benefits.items.map((benefit, index) => (
            <BenefitCard
              key={index}
              icon={icons[index]}
              title={benefit.title}
              description={benefit.description}
              isVisible={isVisible}
              delay={100 + index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
};