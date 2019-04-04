import FooterStyles from './styles/FooterStyles';

const Footer = () => (
  <FooterStyles>
    <div>
      <ul className='social-icons'>
        <li>
          <a href='https://twitter.com/devs_fr' target='_blank'>
            <i className='devicon-twitter-plain twitter' />
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
