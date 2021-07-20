import styled from 'styled-components';

const GridContent = styled.div`
  flex-grow: 1;

  padding: 1.5rem;

  background: ${({ theme: { light } }) => light};

  overflow: hidden;
`;

export default GridContent;
