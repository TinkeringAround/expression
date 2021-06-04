import styled from 'styled-components';

export const SSlicer = styled.div`
  position: relative;

  .wrapper {
    flex-grow: 1;

    padding: 1.5rem;

    overflow: hidden;

    .content {
      position: relative;

      display: flex;
      flex-direction: column;
      align-items: center;

      width: 100%;
      height: 100%;

      border-radius: 2px;
      background: ${props => props.theme.white};
    }
  }
`;
