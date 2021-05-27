import styled from 'styled-components';

export const STag = styled.span`
  padding: 0.5rem;

  border-radius: 2px;
  background: ${props => props.theme.light};
  color: ${props => props.theme.black};
`;
