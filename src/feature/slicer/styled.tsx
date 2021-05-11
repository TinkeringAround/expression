import styled from 'styled-components';

export const SSlicer = styled.div`
  position: relative;

  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }

  .visualizer {
    height: 50%;
    width: 90%;

    border-radius: 1rem;

    background: ${props => props.theme.light10};
    border: solid 5px ${props => props.theme.yellow};
  }
`;
