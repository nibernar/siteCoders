import React from 'react';
import { AlertTriangle, X, AlertCircle, Clock } from 'lucide-react';
import { useLocale } from '../../contexts/LocaleContext';
import { classNames } from '../../utils/classNames';

type ErrorType = 
  | 'VALIDATION_ERROR'
  | 'UNIQUE_CONSTRAINT_ERROR'
  | 'FOREIGN_KEY_ERROR'
  | 'CONNECTION_ERROR'
  | 'TIMEOUT_ERROR'
  | 'DUPLICATE_ENTRY'
  | 'DELETE_CONSTRAINT_ERROR'
  | 'UPDATE_CONSTRAINT_ERROR'
  | 'SQL_ERROR'
  | 'OPTIMISTIC_LOCK_ERROR'
  | 'DATABASE_ERROR';

interface ErrorDetails {
  [key: string]: string;
}

interface DatabaseError {
  type: ErrorType | string;
  message: string;
  details?: ErrorDetails;
  statusCode?: number;
}

// Cette interface permet de gérer aussi bien des DatabaseError que des erreurs plus génériques
interface ErrorDisplayProps {
  error: DatabaseError | any;
  onClose?: () => void;
  className?: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onClose, className }) => {
  const { t } = useLocale();
  
  // Conversion des erreurs en format standardisé
  const normalizedError = React.useMemo(() => {
    // Si l'erreur est déjà au bon format
    if (error && typeof error === 'object' && 'type' in error && 'message' in error) {
      return error as DatabaseError;
    }
    
    // Si l'erreur est un tableau d'objets (format typique d'express-validator)
    if (Array.isArray(error)) {
      const details: ErrorDetails = {};
      
      error.forEach((err, index) => {
        // Pour les objets avec 'msg'
        if (err && typeof err === 'object' && 'msg' in err) {
          const field = 'path' in err ? String(err.path) : `field_${index}`;
          details[field] = String(err.msg);
        }
        // Pour les objets avec 'message'
        else if (err && typeof err === 'object' && 'message' in err) {
          const field = `error_${index}`;
          details[field] = String(err.message);
        }
        // Pour les chaînes de caractères
        else if (typeof err === 'string') {
          details[`error_${index}`] = err;
        }
      });
      
      return {
        type: 'VALIDATION_ERROR',
        message: 'Des erreurs sont survenues',
        details
      } as DatabaseError;
    }
    
    // Si l'erreur est une chaîne
    if (typeof error === 'string') {
      return {
        type: 'DATABASE_ERROR',
        message: error
      } as DatabaseError;
    }
    
    // Fallback pour les autres types d'erreurs
    return {
      type: 'DATABASE_ERROR',
      message: 'Une erreur est survenue'
    } as DatabaseError;
  }, [error]);
  
  const getErrorIcon = (errorType: string) => {
    switch (errorType) {
      case 'VALIDATION_ERROR':
      case 'UNIQUE_CONSTRAINT_ERROR':
      case 'FOREIGN_KEY_ERROR':
      case 'DUPLICATE_ENTRY':
      case 'DELETE_CONSTRAINT_ERROR':
      case 'UPDATE_CONSTRAINT_ERROR':
        return <X className="h-5 w-5 text-red-500" />;
      
      case 'CONNECTION_ERROR':
      case 'SQL_ERROR':
      case 'DATABASE_ERROR':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      
      case 'TIMEOUT_ERROR':
        return <Clock className="h-5 w-5 text-amber-500" />;
        
      default:
        return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
  };
  
  const getErrorBackgroundClass = (errorType: string) => {
    switch (errorType) {
      case 'VALIDATION_ERROR':
      case 'UNIQUE_CONSTRAINT_ERROR':
      case 'FOREIGN_KEY_ERROR':
      case 'DUPLICATE_ENTRY':
      case 'DELETE_CONSTRAINT_ERROR':
      case 'UPDATE_CONSTRAINT_ERROR':
        return 'bg-red-500/10 border-red-500/30';
      
      case 'CONNECTION_ERROR':
      case 'SQL_ERROR':
      case 'DATABASE_ERROR':
        return 'bg-orange-500/10 border-orange-500/30';
      
      case 'TIMEOUT_ERROR':
        return 'bg-amber-500/10 border-amber-500/30';
        
      default:
        return 'bg-red-500/10 border-red-500/30';
    }
  };
  
  return (
    <div 
      className={classNames(
        'p-4 border rounded-md animate-fadein',
        getErrorBackgroundClass(normalizedError.type),
        className
      )}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3 mt-0.5">
          {getErrorIcon(normalizedError.type)}
        </div>
        
        <div className="flex-grow">
          <h4 className="text-sm font-medium text-text-light mb-1">
            {normalizedError.message}
          </h4>
          
          {normalizedError.details && Object.keys(normalizedError.details).length > 0 && (
            <div className="text-xs text-text-light/90 mt-2" data-testid="error-details">
              <ul className="list-disc pl-5 space-y-1">
                {Object.entries(normalizedError.details).map(([key, value]) => (
                  <li key={key}>{value}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {onClose && (
          <button 
            type="button"
            onClick={onClose}
            className="flex-shrink-0 ml-2 text-text-light/70 hover:text-text-light transition-colors"
            aria-label="Fermer"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};