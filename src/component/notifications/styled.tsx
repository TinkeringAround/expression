import styled from 'styled-components';

export const SNotifications = styled.section`
  position: absolute;

  bottom: 2rem;
  right: 3rem;

  z-index: 20;
`;

export const SNotification = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  width: 300px;
  height: 100px;

  padding: 0.5rem 1.25rem;
  margin-bottom: 1rem;

  border-radius: 2px;
  background: ${props => props.theme.hexToRgbA(props.theme.grey, '0.3')};

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
      color: ${props => props.theme.grey};

      transition: color 0.15s ease-in-out;
      cursor: pointer;

      &:hover {
        color: ${props => props.theme.black};
      }
    }

    &[class*='info'] {
      color: ${props => props.theme.blue};
    }

    &[class*='error'] {
      color: ${props => props.theme.red};
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
    background: ${props => props.theme.hexToRgbA(props.theme.grey, '0.4')};
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
