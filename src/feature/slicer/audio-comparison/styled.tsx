import styled from 'styled-components';

export const SAudioComparison = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;

  h2 {
    margin: 0 0 0.5rem 0;

    font-size: 1.75rem;
  }

  .left,
  .right {
    flex: 1;
    padding: 1rem 2rem;

    background: ${props => props.theme.light};

    border-radius: 2px;
    transition: all 0.1s ease-in-out;

    label {
      margin-bottom: 0.5rem;

      font-size: 1.1rem;
      font-weight: bold;
    }

    span {
      display: flex;

      :not(:last-child) {
        margin-bottom: 0.5rem;
      }

      &.changed {
        color: ${props => props.theme.green};
        font-weight: bold;
      }
    }
  }

  .transition {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 15%;

    color: ${props => props.theme.green};
    font-size: 3rem;
  }
`;
