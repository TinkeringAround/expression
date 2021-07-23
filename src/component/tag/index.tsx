import styled from 'styled-components';

const Tag = styled.span`
  padding: 0.5rem;

  border-radius: 2px;
  background: ${({ theme: { light } }) => light};
  color: ${({ theme: { black } }) => black};

  box-shadow: 3px 2px 3px rgb(0 0 0 / 15%);
`;

export default Tag;
