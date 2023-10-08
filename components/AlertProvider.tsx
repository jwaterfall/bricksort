import { createContext, FC, PropsWithChildren, useContext, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Alert {
  id: string;
  title: string;
  description: string;
  // variant?: AlertVariant;
}

interface AlertContext {
  alerts: Alert[];
  addAlert: (title: string, description: string, onConfirm?: () => void) => void;
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

  function addAlert(title: string, description: string) {
    if (!enabled) return;

    const id = Math.random().toString(36).substring(7);
    const alert: Alert = { id, title, description };

    setAlerts((alerts) => [...alerts, alert]);

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
      <div className="z-50 fixed top-0 right-0 h-screen w-screen md:w-fit p-4 flex flex-col gap-2 justify-end md:items-end pointer-events-none">
        {alerts.map(({ id, title, description }) => (
          <Alert key={id}>
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
          </Alert>
        ))}
      </div>
    </AlertContext.Provider>
  );
};

export default AlertProvider;
