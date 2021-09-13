import styled from 'styled-components';

export const SEditorControls = styled.div`
  --height: 2.25rem;

  position: relative;

  width: 100%;
  height: var(--height);
  margin-bottom: 1.25rem;

  color: ${({ theme: { grey } }) => grey};

  .control-groups {
    display: flex;
    flex-direction: row;

    width: calc(100% - 2rem);
    height: 100%;

    .group {
      display: flex;

      height: 100%;

      border-radius: 3px;

      &:not(:first-of-type) {
        margin-left: 1rem;
      }

      .button {
        display: flex;
        justify-content: center;
        align-items: center;

        height: 100%;
        padding: 0 0.75rem;

        background: ${({ theme: { grey } }) => grey};
        color: ${({ theme: { black } }) => black};

        transition: background 0.15s ease-in-out;
        cursor: pointer;

        &.selected {
          background: ${({ theme: { yellow } }) => yellow};
        }

        .icon {
          cursor: pointer;
        }

        &:hover {
          background: ${({ theme: { yellow } }) => yellow};
        }
      }
    }
  }
`;
