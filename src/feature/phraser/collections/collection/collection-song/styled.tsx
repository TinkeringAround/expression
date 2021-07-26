import styled from 'styled-components';

export const SCollectionSong = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  width: 100%;
  height: 40px;
  padding: 0 1rem;
  margin-bottom: 1rem;

  box-sizing: border-box;
  transition: color 0.15s ease-in-out, background 0.15s ease-in-out;

  &:hover {
    color: ${({ theme: { second } }) => second};
    background: ${({ theme: { yellow } }) => yellow};
  }

  &.selected {
    background: ${({ theme: { yellow } }) => yellow};
  }
`;
