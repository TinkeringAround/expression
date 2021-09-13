import styled from 'styled-components';

export const SRhyme = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  width: 100%;
  height: calc(100px + 8.25rem);
  padding: 1rem;

  border-radius: 3px;
  background: ${({ theme: { light } }) => light};

  box-sizing: border-box;

  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`;
