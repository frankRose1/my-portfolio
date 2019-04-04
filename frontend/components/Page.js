import React, { Component } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from './Header';
import Meta from './Meta';
import Footer from './Footer';

const theme = {
  primary: '#cb3837',
  secondary: '#F25F5C',
  error: '#722530',
  warning: '#FFCF56',
  info: '#357edd',
  accent: '#f09233',
  maxWidth: '1100px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)'
};

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`;

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'Roboto', 'sans-serif';
  }
  a {
    text-decoration: none;
    color: ${props => props.theme.black};
  }
  ul {
    list-style: none;
  }

  main {
    min-height: 70vh;
  }
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <GlobalStyle />
          <Meta />
          <Header />
          <main>{this.props.children}</main>
          <Footer />
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
