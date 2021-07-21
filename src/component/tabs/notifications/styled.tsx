import styled from 'styled-components';

export const SNotifications = styled.section`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 1rem 0 2rem;

  overflow: hidden;
  box-sizing: border-box;

  h1 {
    width: 100%;
    margin: 0;
    padding: 1rem 0;

    font-size: 1.5rem;
    background: ${({ theme: { white } }) => white};
    text-align: center;

    z-index: 2;
  }

  .icon-trash {
    position: absolute;
    top: 2.25rem;
    right: 1rem;

    color: ${({ theme: { black } }) => black};
    font-size: 1.25rem;

    transition: color 0.15s ease-in-out;
    z-index: 3;

    &:hover {
      color: ${({ theme: { orange } }) => orange};
    }
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    min-height: 80%;

    overflow: hidden auto;

    > p {
      font-size: 0.8rem;
      color: ${({ theme: { grey } }) => grey};
    }

    ::-webkit-scrollbar-track {
      display: none;
    }

    ::-webkit-scrollbar {
      width: 5px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: ${({ theme: { yellow } }) => yellow};
      border-radius: 2px;

      background-clip: padding-box;

      &:hover {
        background-color: ${({ theme: { hexToRgbA, yellow } }) => hexToRgbA(yellow, '0.8')};
      }
    }
  }
`;

export const SNotification = styled.div`
  display: flex;
  align-items: center;

  width: 90%;

  padding: 0.5rem 1.25rem;
  margin-bottom: 1rem;

  border-radius: 2px;
  background: ${({ theme: { hexToRgbA, grey } }) => hexToRgbA(grey, '0.3')};

  box-sizing: border-box;

  transition: background 0.25s ease-in-out;

  animation: staggerBottom 0.5s ease-in-out;
  animation-delay: calc(var(--index) * 50ms);
  animation-fill-mode: both;

  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;

    &[class*='cross'] {
      position: absolute;
      top: 0.5rem;
      right: -0.5rem;

      font-size: 0.9rem;
      color: ${({ theme: { grey } }) => grey};

      transition: color 0.15s ease-in-out;
      cursor: pointer;

      &:hover {
        color: ${({ theme: { black } }) => black};
      }
    }

    &[class*='info'] {
      color: ${({ theme: { blue } }) => blue};
    }

    &[class*='error'] {
      color: ${({ theme: { red } }) => red};
    }
  }

  p {
    display: flex;
    align-items: center;

    width: 100%;
    height: 100%;

    font-size: 0.8rem;

    overflow: hidden;
  }

  &:hover {
    background: ${({ theme: { hexToRgbA, grey } }) => hexToRgbA(grey, '0.4')};
  }

  @keyframes staggerBottom {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
    }
  }
`;
