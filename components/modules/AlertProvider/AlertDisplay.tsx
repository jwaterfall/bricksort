import { FC } from 'react';
import { FaCheckCircle, FaExclamationCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa';

import Box from '@/components/elements/Box';
import Typography from '@/components/elements/Typography';
import useAlerts, { Alert, AlertType } from '@/components/modules/AlertProvider';

import { AlertCardContainer, ProgressBar } from './styles';

interface IconProps {
  type: AlertType;
}

const Icon: FC<IconProps> = ({ type }) => {
  switch (type) {
    case AlertType.Info:
      return <FaInfoCircle />;
    case AlertType.Warning:
      return <FaExclamationTriangle />;
    case AlertType.Success:
      return <FaCheckCircle />;
    case AlertType.Error:
      return <FaExclamationCircle />;
  }
};

interface Props {
  alert: Alert;
}

const AlertCard: FC<Props> = ({ alert }) => {
  const { removeAlert } = useAlerts();

  return (
    <AlertCardContainer type={alert.type}>
      <Icon type={alert.type} />
      <Box flexBasis="0" flexGrow={1}>
        <Typography variant="h5" transform="capitalize" color="alert" noWrap>
          {alert.title ?? alert.type}
        </Typography>
        <Typography variant="p" transform="capitalize" color="alert" noWrap>
          {alert.message}
        </Typography>
      </Box>
      {!!alert.timeout && <ProgressBar timeout={alert.timeout} />}
      <FaTimes onClick={() => removeAlert(alert.id)} />
    </AlertCardContainer>
  );
};

export default AlertCard;
