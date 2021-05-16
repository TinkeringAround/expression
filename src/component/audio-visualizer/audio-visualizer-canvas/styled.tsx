import styled from 'styled-components';

export const SAudioVisualizer = styled.canvas`
  height: 100%;
  width: 100%;

  border-radius: 0.25rem;

  background: ${props => props.theme.light10};

  border-right: solid 5px ${props => props.theme.yellow};
  border-left: solid 5px ${props => props.theme.yellow};

  box-sizing: border-box;
`;
