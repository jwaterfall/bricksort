import styled from 'styled-components';

export const H1 = styled.h1<{ align: string }>`
  margin: 0;
  font-size: 2rem;
  font-weight: ${(props) => props.theme.weightExtraBold};
  text-align: ${(props) => props.align};
`;

export const H2 = styled.h2<{ align: string }>`
  margin: 0;
  font-size: 1.5rem;
  font-weight: ${(props) => props.theme.weightBold};
  text-align: ${(props) => props.align};
`;

export const H3 = styled.h3<{ align: string }>`
  margin: 0;
  font-size: 1.25rem;
  font-weight: ${(props) => props.theme.weightBold};
  text-align: ${(props) => props.align};
`;

export const H4 = styled.h4<{ align: string }>`
  margin: 0;
  font-size: 1rem;
  font-weight: ${(props) => props.theme.weightBold};
  text-align: ${(props) => props.align};
`;

export const P = styled.p<{ align: string }>`
  margin: 0;
  font-size: 0.875rem;
  font-weight: ${(props) => props.theme.weightRegular};
  text-align: ${(props) => props.align};
  color: ${(props) => props.theme.textSecondary};
`;
