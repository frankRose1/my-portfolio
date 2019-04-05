import styled from 'styled-components';

const FooterStyles = styled.footer`
  background-color: #222;
  color: white;
  padding: 3rem;

  p {
    text-align: center;
  }

  div {
    margin: 0 auto;
    max-width: ${props => props.theme.maxWidth};
  }

  .social-icons {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 280px;
    margin: 20px auto;
  }

  .social-icons a {
    text-decoration: none;
    color: white;
  }

  .social-icons li i {
    font-size: 35px;
    transition: color 0.3s ease-in;
  }

  .gh-hover:hover {
    color: #c9510c;
  }
  .fcc:hover {
    color: #acd157;
  }
  .fa-stack-overflow:hover {
    color: coral;
  }
`;

export default FooterStyles;
