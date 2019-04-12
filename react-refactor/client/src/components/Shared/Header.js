import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div>
        <Link to='/'>{'{F/R}'}</Link>
        <nav>
          <Link to='/skills'>Skills</Link>
          <Link to='/portfolio'>Portfolio</Link>
          <Link to='/contact'>Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
