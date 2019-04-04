import styled from 'styled-components';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.don();
};

const Header = () => (
  <header>
    <Link href='/'>
      <a>
        {'{'}F/R{'}'}
      </a>
    </Link>
    <nav>
      <Link href='/skills'>
        <a>Skills</a>
      </Link>
      <Link href='/portfolio'>
        <a>Portfolio</a>
      </Link>
      <Link href='/contact'>
        <a>Contact</a>
      </Link>
    </nav>
  </header>
);

export default Header;
