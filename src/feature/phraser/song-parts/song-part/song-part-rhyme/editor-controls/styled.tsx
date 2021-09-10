import styled from 'styled-components';

export const SEditorControls = styled.div`
  --height: 2.25rem;

  position: relative;

  width: 100%;
  height: var(--height);
  margin-bottom: 1.25rem;

  color: ${({ theme: { grey } }) => grey};

  .control-groups {
    width: calc(100% - 2rem);
    height: 100%;

    .group {
      display: inline-block;

      height: 100%;

      border-radius: 3px;

      &:not(:first-of-type) {
        margin-left: 1rem;
      }

      button {
        height: 100%;
        padding: 0 0.75rem;

        background: ${({ theme: { grey } }) => grey};
        border: none;
        outline: none;

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

  .icon-trash {
    position: absolute;
    top: 0.25rem;
    right: 0;

    font-size: 1.25rem;

    transition: opacity 0.15s ease-in-out 0.15s, color 0.15s ease-in-out;

    &:not(:last-of-type) {
      margin-right: 1rem;
    }

    &:hover {
      color: ${({ theme: { yellow } }) => yellow};
    }
  }
`;
