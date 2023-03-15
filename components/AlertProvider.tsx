import { createContext, FC, PropsWithChildren, useContext, useState } from "react";
import { FaCheckCircle, FaExclamationCircle, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";
import { useLocalStorage } from "usehooks-ts";

export enum AlertType {
    Success = "success",
    Error = "error",
    Info = "info",
    Warning = "warning",
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
    const [enabled, setEnabled] = useLocalStorage("alertsEnabled", true);

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
                return "alert-success";
            case AlertType.Error:
                return "alert-error";
            case AlertType.Info:
                return "alert-info";
            case AlertType.Warning:
                return "alert-warning";
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
            <div className="z-50 fixed top-0 left-0 w-screen h-screen p-4 flex flex-col gap-2 md:justify-end md:items-end pointer-events-none">
                {alerts.map(({ id, type, message, onConfirm }) => (
                    <div key={id} className={`alert shadow-lg pointer-events-auto ${getAlertTypeStyle(type)} md:max-w-[25rem]`}>
                        <div>
                            {getAlertTypeIcon(type)}
                            <span>{message}</span>
                        </div>
                        {onConfirm && (
                            <div className="flex-none">
                                <button className="btn btn-sm btn-ghost" onClick={() => removeAlert(id)}>
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-sm btn-secondary"
                                    onClick={() => {
                                        onConfirm();
                                        removeAlert(id);
                                    }}
                                >
                                    Accept
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </AlertContext.Provider>
    );
};

export default AlertProvider;
