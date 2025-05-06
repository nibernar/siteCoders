import React, { useState, useRef, useEffect } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { useLocale } from '../../contexts/LocaleContext';
import { Button } from '../ui/Button';
import { ErrorDisplay } from '../ui/ErrorDisplay';
import { classNames } from '../../utils/classNames';
import { Send, Check, AlertTriangle } from 'lucide-react';

interface FormState {
  email: string;
  name: string;
  company: string;
  message: string;
  dbError?: {
    type: string;
    message: string;
    details?: Record<string, string>;
  };
}

interface FormErrors {
  email?: string;
  name?: string;
}

export const Contact = () => {
  const { t } = useLocale();
  const contactRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver({ ref: contactRef });
  
  const [formState, setFormState] = useState<FormState>({
    email: '',
    name: '',
    company: '',
    message: '',
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  // Réinitialiser l'état d'animation quand la section devient invisible
  useEffect(() => {
    if (!isVisible) {
      // Nous ne réinitialisons pas les données du formulaire ici, seulement l'état de l'animation
    }
  }, [isVisible]);

  const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validateField = (name: string, value: string): string | undefined => {
    if (name === 'email') {
      if (!value) return t.contact.form.email.required;
      if (!validateEmail(value)) return t.contact.form.email.invalid;
    }
    
    if (name === 'name' && !value) {
      return t.contact.form.name.required;
    }
    
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormState(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset previous errors
    setFormState(prev => ({ ...prev, dbError: undefined }));
    setSubmitStatus(null);
    
    // Valider tous les champs avant soumission
    const newErrors: FormErrors = {};
    Object.entries(formState).forEach(([key, value]) => {
      if ((key === 'email' || key === 'name') && typeof value === 'string') { // Seulement les champs obligatoires
        const error = validateField(key, value);
        if (error) newErrors[key as keyof FormErrors] = error;
      }
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Marquer tous les champs comme touchés
      const newTouched: Record<string, boolean> = {};
      Object.keys(formState).forEach(key => { 
        if (key !== 'dbError') newTouched[key] = true; 
      });
      setTouched(newTouched);
      return;
    }
    
    // Soumettre le formulaire
    setSubmitting(true);
    
    try {
      // URL complète avec le port correct pour le backend
      const response = await fetch('http://localhost:5001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formState.email,
          name: formState.name,
          company: formState.company,
          message: formState.message
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        if (data.errors || (data.error && data.message)) {
          // C'est une erreur formatée de la base de données
          setFormState(prev => ({
            ...prev,
            dbError: {
              type: data.error || 'validation_error',
              message: data.message || 'Une erreur est survenue lors de la validation',
              details: data.errors || data.details
            }
          }));
          setSubmitStatus('error');
          return;
        }
        throw new Error(data.message || 'Une erreur est survenue');
      }
      
      // Succès
      setSubmitStatus('success');
      setFormState({
        email: '',
        name: '',
        company: '',
        message: '',
      });
      setTouched({});
    } catch (error) {
      // Pour les erreurs génériques qui ne sont pas des erreurs de base de données formatées
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-primary-dark" ref={contactRef}>
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-accent mb-4">{t.contact.title}</h2>
          <p className="text-text-light/90">{t.contact.intro}</p>
        </div>

        <div className="max-w-xl mx-auto">
          <form 
            onSubmit={handleSubmit}
            className={classNames(
              'bg-primary p-8 rounded-xl transition-all duration-500',
              isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
            )}
          >
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-md flex items-center">
                <Check className="flex-shrink-0 h-5 w-5 text-green-500 mr-3" />
                <p className="text-text-light">{t.contact.form.success}</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-md flex items-center">
                <AlertTriangle className="flex-shrink-0 h-5 w-5 text-red-500 mr-3" />
                <p className="text-text-light">{t.contact.form.error}</p>
              </div>
            )}
            
            {/* Database error display - will be populated from API responses */}
            {formState.dbError && (
              <ErrorDisplay error={formState.dbError} className="mb-6" />
            )}

            <div className="mb-6">
              <label htmlFor="email" className="block text-text-light mb-2">
                {t.contact.form.email.label} <span className="text-accent">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={t.contact.form.email.placeholder}
                className={classNames(
                  'w-full p-3 bg-primary-dark border rounded-md focus:outline-none focus:ring-2 focus:ring-accent transition-colors',
                  errors.email ? 'border-red-500' : 'border-accent/30'
                )}
                required
              />
              {touched.email && errors.email && (
                <p className="mt-2 text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="name" className="block text-text-light mb-2">
                {t.contact.form.name.label} <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={t.contact.form.name.placeholder}
                className={classNames(
                  'w-full p-3 bg-primary-dark border rounded-md focus:outline-none focus:ring-2 focus:ring-accent transition-colors',
                  errors.name ? 'border-red-500' : 'border-accent/30'
                )}
                required
              />
              {touched.name && errors.name && (
                <p className="mt-2 text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="company" className="block text-text-light mb-2">
                {t.contact.form.company.label}
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formState.company}
                onChange={handleChange}
                placeholder={t.contact.form.company.placeholder}
                className="w-full p-3 bg-primary-dark border border-accent/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-text-light mb-2">
                {t.contact.form.message.label}
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                placeholder={t.contact.form.message.placeholder}
                rows={4}
                className="w-full p-3 bg-primary-dark border border-accent/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
              ></textarea>
            </div>

            <Button
              type="submit"
              className="w-full flex items-center justify-center"
              disabled={submitting}
            >
              {submitting ? (
                <span className="inline-block w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin mr-2"></span>
              ) : (
                <Send size={18} className="mr-2" />
              )}
              {t.contact.form.submit}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};