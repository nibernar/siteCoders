import React, { useState, useRef } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useLocale } from '../../contexts/LocaleContext';
import { classNames } from '../../utils/classNames';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQItem = ({ 
  question, 
  answer, 
  isOpen, 
  onToggle,
  isVisible,
  delay,
}: { 
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  isVisible: boolean;
  delay: number;
}) => {
  return (
    <div 
      className={classNames(
        'border-b border-accent/20 transition-all duration-500',
        isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <button
        className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium">{question}</span>
        {isOpen ? (
          <ChevronUp className="flex-shrink-0 ml-4 h-5 w-5 text-accent" />
        ) : (
          <ChevronDown className="flex-shrink-0 ml-4 h-5 w-5 text-accent" />
        )}
      </button>
      <div
        className={classNames(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-96 pb-4' : 'max-h-0'
        )}
      >
        <p className="text-text-light/80">{answer}</p>
      </div>
    </div>
  );
};

export const FAQ = () => {
  const { t } = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver({ ref: faqRef });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20" ref={faqRef}>
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-accent mb-4">{t.faq.title}</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {t.faq.items.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
              isVisible={isVisible}
              delay={100 + index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};