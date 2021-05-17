import styled from 'styled-components';

export const SSlicer = styled.div`
  position: relative;

  .content {
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;

    .slicer-info {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;

      width: 90%;

      margin: 1rem 0 2rem;
      padding: 1rem;
      background: ${props => props.theme.white};
      border-radius: 2px;

      box-sizing: border-box;

      > div {
        display: flex;
        flex-direction: row;

        width: 100%;
        margin-bottom: 2rem;

        h1 {
          margin: 0 0 0 1rem;
          font-size: 2.5rem;
        }

        span {
          font-size: 3rem;
        }
      }
    }

    .slicer-visualizer {
      position: relative;

      height: 50%;
      width: 90%;

      padding: 1rem;

      border-radius: 2px;
      background: ${props => props.theme.white};

      box-sizing: border-box;
    }
  }
`;
