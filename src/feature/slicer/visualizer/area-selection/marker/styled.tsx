import styled from 'styled-components';

export const SMarker = styled.div`
  --width: 4px;

  position: absolute;
  top: -5px;

  height: calc(100% + 10px);
  width: var(--width);

  border-radius: 2px;

  transform: translateX(calc(var(--width) / 2));
  transition: left 50ms linear;

  background: ${({ theme: { red } }) => red};
`;
