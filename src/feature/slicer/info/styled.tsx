import styled from 'styled-components';

export const SInfo = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;

  margin: 1rem 0 2rem;
  padding: 1rem 2rem;

  box-sizing: border-box;

  .aboutFileName {
    display: flex;
    align-items: center;

    width: 100%;
    margin-bottom: 0.5rem;

    transition: color 0.15s ease-in-out;
    cursor: pointer;

    h1,
    span {
      font-size: 3rem;
    }

    h1 {
      margin: 0 0 0 1rem;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    :hover {
      color: ${({ theme }) => theme.darkBlue};
    }
  }

  .aboutFileSize {
    display: flex;

    font-size: 0.85rem;

    & > :not(last-child) {
      margin-right: 1rem;
    }
  }
`;
