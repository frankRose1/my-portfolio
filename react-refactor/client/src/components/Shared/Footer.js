import React from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

const Footer = ({ classes }) => {
  const footerLinks = [
    {
      key: 'FCC',
      url: 'https://www.freecodecamp.org/forum/u/frankRose1/activity',
      iconClasses: 'fab fa-free-code-camp'
    },
    {
      key: 'GH',
      url: 'https://github.com/frankRose1',
      iconClasses: 'devicon-github-plain'
    },
    {
      key: 'STK',
      url: 'https://stackexchange.com/users/14858932/frank-rose',
      iconClasses: 'fab fa-stack-overflow'
    },
    {
      key: 'contact',
      url: '/contact',
      iconClasses: 'fas fa-envelope'
    }
  ];

  return (
    <footer>
      <div className={classes.links}>
        {footerLinks.map(link => (
          <div key={link.key} className={classes.iconCard}>
            {link.key === 'contact' ? (
              <Link className={classes.link} to={link.url}>
                <i className={`${link.iconClasses} ${classes.icon}`} />
              </Link>
            ) : (
              <a
                className={classes.link}
                href={link.url}
                target='_blank'
                rel='noopener noreferrer'
              >
                <i className={`${link.iconClasses} ${classes.icon}`} />
              </a>
            )}
          </div>
        ))}
      </div>
      <p className={classes.copyRight}>
        {' '}
        &copy; Frank Rosendorf {new Date().getFullYear()} | All Rights Reserved
      </p>
    </footer>
  );
};

const styles = theme => ({
  links: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr'
  },
  iconCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: '100% 200%',
    backgroundImage: `linear-gradient(to bottom, #b0bec5 50%, ${
      theme.palette.info.main
    } 50%)`,
    borderRight: '1px solid #f3f6f7',
    height: '200px',
    transition: 'background-position 0.3s ease-in',
    '&:hover': {
      backgroundPosition: '0 100%'
    }
  },
  link: {
    cursor: 'pointer',
    textDecoration: 'none',
    color: '#f3f6f7'
  },
  icon: {
    fontSize: '60px'
  },
  copyRight: {
    backgroundColor: theme.palette.dark.main,
    textAlign: 'center',
    color: '#f3f6f7',
    margin: '0',
    padding: '10px 0px'
  }
});

export default withStyles(styles)(Footer);
