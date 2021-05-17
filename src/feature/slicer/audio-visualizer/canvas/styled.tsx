import styled from 'styled-components';

export const SCanvas = styled.canvas`
  height: 100%;
  width: 100%;

  border-radius: 2px;

  background: ${props => props.theme.light};

  border-right: solid 5px ${props => props.theme.yellow};
  border-left: solid 5px ${props => props.theme.yellow};

  box-sizing: border-box;
`;
