import React from 'react';
import { useLocale } from '../../contexts/LocaleContext';
import { Twitter, Linkedin } from 'lucide-react';

export const Footer = () => {
  const { t } = useLocale();

  return (
    <footer className="bg-background-dark py-12">
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-8">
          {/* Logo and company info */}
          <div className="text-center">
            <div className="flex items-center gap-2 mb-4 justify-center">
              <span className="text-2xl font-bold neon-text-strong">CODERS<span className="text-text-light">🤖</span></span>
            </div>
            <p className="text-text-light/70 mb-4 max-w-xs text-center">
              Automatisez votre processus de développement et transformez les spécifications en code source de qualité.
            </p>
            
            <div className="flex items-center gap-4 mt-6 justify-center">
              <a 
                href="https://x.com/Coders_Ai" 
                className="text-text-light/70 hover:text-accent transition-colors" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/company/codersai" 
                className="text-text-light/70 hover:text-accent transition-colors" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-accent/20 mt-12 pt-6 text-center">
          <p className="text-text-light/50 text-sm">{t.footer.legal}</p>
        </div>
      </div>
    </footer>
  );
};