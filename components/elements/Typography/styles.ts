import styled from 'styled-components';

import { TypographyProps } from './';

const BaseTypography = styled.div<Omit<TypographyProps, 'variant'>>`
  margin: ${({ m }) => m ?? 0};
  padding: ${({ p }) => p ?? 0};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme, color }) => (color === 'alert' ? theme.colors.alerts.text : theme.text)};
  ${({ align }) => `text-align: ${align};`};
  ${({ transform }) => `text-transform: ${transform};`};
`;

export const P = styled(BaseTypography).attrs({
  as: 'p',
})`
  ${({ noWrap }) => !noWrap && 'white-space: pre-line;'}
  font-size: ${({ theme }) => theme.fontSizeXs};
  font-weight: ${({ theme }) => theme.fontWeightMedium};
  overflow-wrap: anywhere;
  line-height: 1.25rem;
`;

export const H1 = styled(BaseTypography).attrs({
  as: 'h1',
})`
  font-size: clamp(40px, 8vw, 80px);
  font-weight: ${({ theme }) => theme.fontWeightExtraBold};
`;

export const H2 = styled(BaseTypography).attrs({
  as: 'h2',
})`
  font-size: ${({ theme }) => theme.fontSizeXxl};
  font-weight: ${({ theme }) => theme.fontWeightBold};
`;

export const H3 = styled(BaseTypography).attrs({
  as: 'h3',
})`
  font-size: ${({ theme }) => theme.fontSizeXl};
  font-weight: ${({ theme }) => theme.fontWeightBold};
`;

export const H4 = styled(BaseTypography).attrs({
  as: 'h4',
})`
  font-size: ${({ theme }) => theme.fontSizeLg};
  font-weight: ${({ theme }) => theme.fontWeightSemiBold};
`;

export const H5 = styled(BaseTypography).attrs({
  as: 'h5',
})`
  font-size: ${({ theme }) => theme.fontSizeMd};
  font-weight: ${({ theme }) => theme.fontWeightSemiBold};
`;

export const H6 = styled(BaseTypography).attrs({
  as: 'h6',
})`
  font-size: ${({ theme }) => theme.fontSizeSm};
  font-weight: ${({ theme }) => theme.fontWeightMedium};
`;
