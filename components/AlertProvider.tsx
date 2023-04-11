import { createContext, FC, PropsWithChildren, useContext, useState } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';
import { useLocalStorage } from 'usehooks-ts';
import Button from './Button';

export enum AlertType {
    Success = 'success',
    Error = 'error',
    Info = 'info',
    Warning = 'warning',
}

interface Alert {
    id: string;
    message: string;
    type: AlertType;
    onConfirm?: () => void;
}

interface AlertContext {
    alerts: Alert[];
    addAlert: (message: string, type?: AlertType, onConfirm?: () => void) => void;
    removeAlert: (id: string) => void;
    enabled: boolean;
    setEnabled: (enabled: (enabled: boolean) => boolean) => void;
}

const AlertContext = createContext<AlertContext>({} as AlertContext);

export function useAlerts() {
    return useContext(AlertContext);
}

const AlertProvider: FC<PropsWithChildren> = ({ children }) => {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [enabled, setEnabled] = useLocalStorage('alertsEnabled', true);

    function addAlert(message: string, type: AlertType = AlertType.Info, onConfirm?: () => void) {
        if (!enabled) return;

        const id = Math.random().toString(36).substring(7);
        const alert: Alert = { id, message, type, onConfirm };

        setAlerts((alerts) => [...alerts, alert]);

        if (onConfirm) return;

        setTimeout(() => {
            removeAlert(id);
        }, 2000);
    }

    function removeAlert(id: string) {
        setAlerts((alerts) => alerts.filter((a) => a.id !== id));
    }

    function getAlertTypeStyle(type: AlertType) {
        switch (type) {
            case AlertType.Success:
                return 'bg-green-500';
            case AlertType.Error:
                return 'bg-red-500';
            case AlertType.Info:
                return 'bg-blue-500';
            case AlertType.Warning:
                return 'bg-amber-500';
        }
    }

    function getAlertTypeIcon(type: AlertType) {
        switch (type) {
            case AlertType.Success:
                return <FaCheckCircle className="w-5 h-5" />;
            case AlertType.Error:
                return <FaExclamationCircle className="w-5 h-5" />;
            case AlertType.Info:
                return <FaInfoCircle className="w-5 h-5" />;
            case AlertType.Warning:
                return <FaExclamationTriangle className="w-5 h-5" />;
        }
    }

    return (
        <AlertContext.Provider value={{ alerts, addAlert, removeAlert, enabled, setEnabled }}>
            {children}
            <div className="z-50 fixed top-0 left-0 w-screen h-screen p-4 flex flex-col gap-2 justify-end md:items-end pointer-events-none">
                {alerts.map(({ id, type, message, onConfirm }) => (
                    <div key={id} className={`p-4 rounded-md shadow-lg pointer-events-auto ${getAlertTypeStyle(type)} md:max-w-[25rem]`}>
                        <div className="flex-1 flex items-center gap-2 text-slate-50">
                            {getAlertTypeIcon(type)}
                            <span>{message}</span>
                        </div>
                        {onConfirm && (
                            <div className="flex gap-2 mt-2 justify-center">
                                <Button onClick={() => removeAlert(id)}>No</Button>
                                <Button
                                    onClick={() => {
                                        onConfirm();
                                        removeAlert(id);
                                    }}
                                >
                                    Yes
                                </Button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </AlertContext.Provider>
    );
};

export default AlertProvider;
