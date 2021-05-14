import styled from 'styled-components';

export const SSlicer = styled.div`
  position: relative;

  .content {
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }

  .visualizer {
    position: relative;

    height: 50%;
    width: 90%;

    box-sizing: content-box;

    span {
      color: ${props => props.theme.light};
    }

    //.resizable {
    //  position: absolute !important;
    //  top: 5px;
    //
    //  border-radius: 0.75rem;
    //
    //  z-index: 5;
    //
    //  background: rgba(255, 255, 255, 0.1);
    //}

    canvas {
      height: 100%;
      width: 100%;

      border-radius: 0.25rem;

      background: ${props => props.theme.light10};

      border-right: solid 5px ${props => props.theme.yellowLight};
      border-left: solid 5px ${props => props.theme.yellowLight};
      border-bottom: solid 5px ${props => props.theme.yellowLight};
    }
  }
`;
