import styled from 'styled-components';

const GridContent = styled.div`
  flex: 1;
  height: 100%;

  padding: 1.5rem;

  background: ${({ theme: { light } }) => light};

  box-sizing: border-box;
  overflow: hidden;
`;

export default GridContent;
