import styled from 'styled-components';

export const SSlicer = styled.div`
  position: relative;

  .content {
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;

    header {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      width: 90%;

      padding: 2rem 0 3rem;

      color: ${props => props.theme.yellowLight};

      box-sizing: border-box;

      text-align: end;

      div {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;

        width: 100%;

        margin-bottom: 0.5rem;

        h1 {
          margin: 0;
          font-size: 2.5rem;
        }

        span {
          margin-left: 1rem;

          font-size: 3rem;
        }
      }
    }

    .visualizer {
      position: relative;

      height: 50%;
      width: 90%;

      box-sizing: content-box;

      span {
        color: ${props => props.theme.light};
      }
    }

    // canvas {
    //   height: 100%;
    //   width: 100%;
    //
    //   border-radius: 0.25rem;
    //
    //   background: ${props => props.theme.light10};
    //
    //   border-right: solid 5px ${props => props.theme.yellowLight};
    //   border-left: solid 5px ${props => props.theme.yellowLight};
    //   border-bottom: solid 5px ${props => props.theme.yellowLight};
    // }
  }
`;
