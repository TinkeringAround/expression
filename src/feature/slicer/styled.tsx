import styled from 'styled-components';

export const SSlicer = styled.div`
  position: relative;

  .content {
    flex-grow: 1;

    padding: 1.5rem;

    .editor {
      position: relative;

      display: flex;
      flex-direction: column;
      align-items: center;

      width: 100%;
      height: 100%;

      border-radius: 2px;
      background: ${props => props.theme.white};

      section {
        width: 100%;

        &.info {
          display: flex;
          flex-direction: column;

          margin: 1rem 0 2rem;
          padding: 1rem 2rem;

          box-sizing: border-box;

          .aboutFileName {
            display: flex;
            align-items: center;

            width: 100%;
            margin-bottom: 0.5rem;

            h1,
            span {
              font-size: 3rem;
            }

            h1 {
              margin: 0 0 0 1rem;
            }
          }

          .aboutFileSize {
            display: flex;

            font-size: 0.85rem;

            & > :not(last-child) {
              margin-right: 1rem;
            }
          }
        }

        &.visualizer {
          position: relative;

          display: flex;
          justify-content: center;

          height: 60%;
          padding: 0 2rem;

          box-sizing: border-box;

          overflow: hidden;
        }
      }
    }
  }
`;
