import styled from 'styled-components';

import { fadeIn } from '../../animations';

export const SControls = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;

  animation: fadeIn 0.25s ease-in-out;

  ${fadeIn};
`;
