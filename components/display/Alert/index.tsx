import { FC, PropsWithChildren } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

export type AlertVariant = 'default' | 'success' | 'error' | 'info' | 'warning';

interface AlertProps {
  description: string;
  title?: string;
  variant?: AlertVariant;
}

const Alert: FC<PropsWithChildren<AlertProps>> = ({ children, description, title, variant = 'default' }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'default':
        return 'bg-slate-200 border border-slate-300 text-slate-950';
      case 'success':
        return 'bg-green-500 text-green-950';
      case 'error':
        return 'bg-red-500 text-red-950';
      case 'info':
        return 'bg-blue-500 text-blue-950';
      case 'warning':
        return 'bg-amber-500 text-amber-950';
    }
  };

  function getVariantIcon() {
    switch (variant) {
      case 'default':
        return <FaInfoCircle size={20} />;
      case 'success':
        return <FaCheckCircle size={20} />;
      case 'error':
        return <FaExclamationCircle size={20} />;
      case 'info':
        return <FaInfoCircle size={20} />;
      case 'warning':
        return <FaExclamationTriangle size={20} />;
    }
  }

  return (
    <div
      className={`p-4 rounded-md shadow-lg pointer-events-auto w-full flex items-center justify-between gap-4 flex-col sm:flex-row ${getVariantStyles()}`}
    >
      <div className="flex-1 flex items-center gap-2">
        {getVariantIcon()}
        {title ? (
          <div>
            <h4 className="font-semibold">{title}</h4>
            <p className="text-xs">{description}</p>
          </div>
        ) : (
          <p>{description}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
};

export default Alert;
