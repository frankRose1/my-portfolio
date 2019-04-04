import styled from 'styled-components';

const PageTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 400;

  :after {
    content: '';
    width: 150px;
    margin: 10px auto 15px auto;
    display: block;
    background: rgba(0, 0, 0, 0.4);
    height: 2px;
  }
`;

export default PageTitle;
