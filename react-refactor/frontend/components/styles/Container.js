import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

export default Container;
