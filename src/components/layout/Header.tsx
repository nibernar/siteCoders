import React, { useState, useEffect } from 'react';
import { useLocale } from '../../contexts/LocaleContext';
import { Button } from '../ui/Button';
import { classNames } from '../../utils/classNames';
import { Globe, Menu, X } from 'lucide-react';

export const Header = () => {
  const { locale, setLocale, t } = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header
      className={classNames(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-primary py-2 shadow-lg'
          : 'bg-transparent py-4'
      )}
    >
      <div className="container flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="text-2xl font-bold neon-text-strong">CODERS<span className="text-text-light">🤖</span></span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#process" className="text-text-light hover:text-accent transition-colors">
            {t.header.nav.process}
          </a>
          <a href="#benefits" className="text-text-light hover:text-accent transition-colors">
            {t.header.nav.benefits}
          </a>
          <a href="#faq" className="text-text-light hover:text-accent transition-colors">
            {t.header.nav.faq}
          </a>
          <a href="#contact" className="text-text-light hover:text-accent transition-colors">
            {t.header.nav.contact}
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <div className="relative group">
            <button
              className="flex items-center gap-1 px-3 py-1 text-text-light hover:text-accent transition-colors"
              aria-label="Change language"
            >
              <Globe size={16} />
              <span className="uppercase">{locale}</span>
            </button>

            <div className="absolute right-0 mt-2 w-24 bg-primary-dark rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <button
                className={classNames(
                  'w-full text-left px-4 py-2 hover:bg-primary rounded-t-md transition-colors',
                  locale === 'fr' ? 'text-accent' : 'text-text-light'
                )}
                onClick={() => setLocale('fr')}
              >
                Français
              </button>
              <button
                className={classNames(
                  'w-full text-left px-4 py-2 hover:bg-primary rounded-b-md transition-colors',
                  locale === 'en' ? 'text-accent' : 'text-text-light'
                )}
                onClick={() => setLocale('en')}
              >
                English
              </button>
            </div>
          </div>

          <Button onClick={scrollToContact}>{t.header.cta}</Button>
        </div>

        {/* Mobile Toggle Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button 
            className="p-2 text-text-light" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={classNames(
            'fixed inset-0 bg-background-dark/95 flex flex-col justify-center items-center z-50 transition-all duration-300 md:hidden',
            isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          )}
        >
          <button
            className="absolute top-4 right-4 p-2 text-text-light"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>

          <nav className="flex flex-col items-center gap-6 mb-8">
            <a 
              href="#process" 
              className="text-xl text-text-light hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.header.nav.process}
            </a>
            <a 
              href="#benefits" 
              className="text-xl text-text-light hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.header.nav.benefits}
            </a>
            <a 
              href="#faq" 
              className="text-xl text-text-light hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.header.nav.faq}
            </a>
            <a 
              href="#contact" 
              className="text-xl text-text-light hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {t.header.nav.contact}
            </a>
          </nav>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4 mb-4">
              <button
                className={classNames(
                  'px-4 py-2 rounded-md transition-colors',
                  locale === 'fr' ? 'bg-primary text-accent' : 'text-text-light'
                )}
                onClick={() => setLocale('fr')}
              >
                FR
              </button>
              <button
                className={classNames(
                  'px-4 py-2 rounded-md transition-colors',
                  locale === 'en' ? 'bg-primary text-accent' : 'text-text-light'
                )}
                onClick={() => setLocale('en')}
              >
                EN
              </button>
            </div>

            <Button onClick={scrollToContact}>
              {t.header.cta}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};