import styled from 'styled-components';

export const SSlicer = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;

  background: ${({ theme: { white } }) => white};

  border-radius: 3px;
`;
