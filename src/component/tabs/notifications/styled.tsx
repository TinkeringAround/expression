import styled from 'styled-components';

import { SGridTabTemplate, SGridTabItemTemplate } from '../../grid/grid-tabs/styled';

export const SNotifications = styled(SGridTabTemplate)``;

export const SNotification = styled(SGridTabItemTemplate)`
  align-items: center;

  width: 85%;

  padding: 1rem 1.25rem;
  margin-bottom: 1rem;

  background: ${({ theme: { hexToRgbA, grey } }) => hexToRgbA(grey, '0.3')};

  animation: staggerBottom 0.5s ease-in-out;
  animation-delay: calc(var(--index) * 50ms);
  animation-fill-mode: both;

  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;

    transition: color 0.2s ease-in-out;

    &[class*='info'] {
      color: ${({ theme: { blue } }) => blue};
    }

    &[class*='error'] {
      color: ${({ theme: { red } }) => red};
    }
  }

  &:hover {
    .icon {
      color: ${({ theme: { black } }) => black};
    }
  }

  span.message {
    display: flex;
    align-items: center;

    width: 100%;
    height: 100%;

    font-size: 0.8rem;

    overflow: hidden;
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
