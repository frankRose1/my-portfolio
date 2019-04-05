import FooterStyles from './styles/FooterStyles';

const Footer = () => (
  <FooterStyles>
    <div>
      <ul className='social-icons'>
        <li>
          <a
            href='https://www.freecodecamp.org/forum/u/frankRose1/activity'
            target='_blank'
          >
            <i className='fab fa-free-code-camp fcc' />
          </a>
        </li>
        <li>
          <a href='https://github.com/frankRose1' target='_blank'>
            <i className='devicon-github-plain github gh-hover' />
          </a>
        </li>
        <li>
          <a
            href='https://stackexchange.com/users/14858932/frank-rose'
            target='_blank'
          >
            <i className='fab fa-stack-overflow' />
          </a>
        </li>
      </ul>
      <p className='copyright'>
        &copy; Frank Rosendorf {new Date().getFullYear()} | All Rights Reserved
      </p>
    </div>
  </FooterStyles>
);

export default Footer;
