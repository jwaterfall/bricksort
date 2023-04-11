import { createContext, FC, PropsWithChildren, useContext, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import Alert, { AlertVariant } from './Alert';
import Button from './Button';

interface Alert {
    id: string;
    description: string;
    variant?: AlertVariant;
    onConfirm?: () => void;
}

interface AlertContext {
    alerts: Alert[];
    addAlert: (description: string, variant?: AlertVariant, onConfirm?: () => void) => void;
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

    function addAlert(description: string, variant?: AlertVariant, onConfirm?: () => void) {
        if (!enabled) return;

        const id = Math.random().toString(36).substring(7);
        const alert: Alert = { id, description, variant, onConfirm };

        setAlerts((alerts) => [...alerts, alert]);

        if (onConfirm) return;

        setTimeout(() => {
            removeAlert(id);
        }, 2000);
    }

    function removeAlert(id: string) {
        setAlerts((alerts) => alerts.filter((a) => a.id !== id));
    }

    return (
        <AlertContext.Provider value={{ alerts, addAlert, removeAlert, enabled, setEnabled }}>
            {children}
            <div className="z-50 fixed top-0 left-0 w-screen h-screen p-4 flex flex-col gap-2 justify-end md:items-end pointer-events-none">
                {alerts.map(({ id, variant, description, onConfirm }) => (
                    <Alert key={id} description={description} variant={variant}>
                        {onConfirm && (
                            <>
                                <Button onClick={() => removeAlert(id)}>Cancel</Button>
                                <Button
                                    color="primary"
                                    onClick={() => {
                                        removeAlert(id);
                                        onConfirm();
                                    }}
                                >
                                    Confirm
                                </Button>
                            </>
                        )}
                    </Alert>
                ))}
            </div>
        </AlertContext.Provider>
    );
};

export default AlertProvider;
