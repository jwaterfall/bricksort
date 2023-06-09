import { FC } from 'react';
import { MdCheckCircle, MdClose, MdError, MdInfo, MdWarning } from 'react-icons/md';

export type AlertVariant = 'info' | 'success' | 'error' | 'warning';

interface AlertProps {
  title: string;
  description: string;
  variant?: AlertVariant;
  onClose?: () => void;
}

const Alert: FC<AlertProps> = ({ description, title, variant = 'info', onClose }) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'info':
        return 'bg-info-200 border-info-100';
      case 'success':
        return 'bg-success-200 border-success-100';
      case 'error':
        return 'bg-error-200 border-error-100';
      case 'warning':
        return 'bg-warning-200 border-warning-100';
    }
  };

  function getVariantIcon() {
    switch (variant) {
      case 'info':
        return <MdInfo size={20} className="text-blue-400" />;
      case 'success':
        return <MdCheckCircle size={20} className="text-green-400" />;
      case 'error':
        return <MdError size={20} className="text-red-400" />;
      case 'warning':
        return <MdWarning size={20} className="text-amber-400" />;
    }
  }

  return (
    <div className={`border max-w-xl py-4 px-6 rounded-sm shadow-lg pointer-events-auto w-full flex justify-between gap-2 ${getVariantStyles()}`}>
      {getVariantIcon()}
      <div className="flex-1">
        <h4 className="font-medium text-sm mb-2 text-zinc-50">{title}</h4>
        <p className="text-xs text-zinc-100 font-thin">{description}</p>
      </div>
      {onClose && (
        <button className="h-fit p-0.5 rounded-sm text-zinc-300 transition-colors hover:bg-zinc-50/20" onClick={onClose}>
          <MdClose size={16} />
        </button>
      )}
    </div>
  );
};

export default Alert;
