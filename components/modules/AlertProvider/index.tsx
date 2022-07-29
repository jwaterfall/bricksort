import { useAutoAnimate } from '@formkit/auto-animate/react';
import React, { FC, PropsWithChildren, createContext, useContext, useState } from 'react';

import usePreferences from '@/contexts/PreferencesContext';

import AlertCard from './AlertDisplay';
import { Container } from './styles';

export enum AlertType {
  Info = 'info',
  Warning = 'warning',
  Success = 'success',
  Error = 'error',
}

export interface Alert {
  id: string;
  title?: string;
  message: string;
  type: AlertType;
  timeout?: number;
}

interface AlertsContextValue {
  alerts: Alert[];
  addAlert: (type: AlertType, title: string, message: string, timeout?: number) => void;
  removeAlert: (id: string) => void;
}

const AlertsContext = createContext<AlertsContextValue>({} as AlertsContextValue);

export const AlertProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { showAlerts } = usePreferences();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [animateRef] = useAutoAnimate<HTMLDivElement>();

  const addAlert = (type: AlertType, title: string, message: string, timeout?: number) => {
    if (!showAlerts) return;

    const id = Math.random().toString(36).substring(2, 15);

    if (timeout) {
      setTimeout(() => {
        removeAlert(id);
      }, timeout);
    }

    setAlerts([...alerts, { id, title, message, type, timeout }]);
  };

  const removeAlert = (id: string) => {
    setAlerts((alerts) => alerts.filter((alert) => alert.id !== id));
  };

  return (
    <AlertsContext.Provider
      value={{
        alerts,
        addAlert,
        removeAlert,
      }}
    >
      <Container ref={animateRef}>
        {alerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </Container>
      {children}
    </AlertsContext.Provider>
  );
};

const useAlerts = () => useContext(AlertsContext);

export default useAlerts;
