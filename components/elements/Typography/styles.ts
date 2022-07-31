import styled from 'styled-components';

import { TypographyProps } from './';

const BaseTypography = styled.div<Omit<TypographyProps, 'variant'>>`
  margin: ${({ m }) => m ?? 0};
  padding: ${({ p }) => p ?? 0};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme, color }) => (color === 'alert' ? theme.colors.alerts.text : theme.colors.text)};
  ${({ align }) => `text-align: ${align};`};
  ${({ transform }) => `text-transform: ${transform};`};
`;

export const P = styled(BaseTypography).attrs({
  as: 'p',
})`
  ${({ noWrap }) => !noWrap && 'white-space: pre-line;'}
  font-size: ${({ theme }) => theme.font.size.xs};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  overflow-wrap: anywhere;
  line-height: 1.25rem;
`;

export const H1 = styled(BaseTypography).attrs({
  as: 'h1',
})`
  font-size: clamp(40px, 8vw, 80px);
  font-weight: ${({ theme }) => theme.font.weight.extraBold};
`;

export const H2 = styled(BaseTypography).attrs({
  as: 'h2',
})`
  font-size: ${({ theme }) => theme.font.size.xxl};
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;

export const H3 = styled(BaseTypography).attrs({
  as: 'h3',
})`
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;

export const H4 = styled(BaseTypography).attrs({
  as: 'h4',
})`
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
`;

export const H5 = styled(BaseTypography).attrs({
  as: 'h5',
})`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
`;

export const H6 = styled(BaseTypography).attrs({
  as: 'h6',
})`
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
`;
