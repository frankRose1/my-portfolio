import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

const Footer = ({ classes }) => {
  return (
    <footer className={classes.root}>
      <div className={classes.container}>
        <ul className={classes.socialList}>
          <li>
            <a
              className={classes.link}
              href='https://www.freecodecamp.org/forum/u/frankRose1/activity'
              target='_blank'
            >
              <i
                className={`fab fa-free-code-camp ${classes.icon} ${
                  classes.fcc
                }`}
              />
            </a>
          </li>
          <li>
            <a
              className={classes.link}
              href='https://github.com/frankRose1'
              target='_blank'
            >
              <i
                className={`devicon-github-plain ${classes.icon} ${
                  classes.github
                }`}
              />
            </a>
          </li>
          <li>
            <a
              className={classes.link}
              href='https://stackexchange.com/users/14858932/frank-rose'
              target='_blank'
            >
              <i
                className={`fab fa-stack-overflow ${classes.icon} ${
                  classes.stack
                }`}
              />
            </a>
          </li>
        </ul>
        <p>
          &copy; Frank Rosendorf {new Date().getFullYear()} | All Rights
          Reserved
        </p>
      </div>
    </footer>
  );
};

const styles = theme => ({
  root: {
    background: theme.palette.dark.main,
    color: '#fff',
    padding: '2rem'
  },
  container: {
    margin: '0 auto',
    textAlign: 'center'
  },
  socialList: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    maxWidth: '300px',
    margin: '20px auto',
    listStyle: 'none',
    padding: '0px'
  },
  link: {
    textDecoration: 'none',
    color: '#FFF'
  },
  icon: {
    fontSize: '35px',
    transition: 'color 0.3s ease-in',
    '&:hover': {
      transform: 'translateY(-1px)'
    }
  },
  fcc: {
    '&:hover': {
      color: '#acd157'
    }
  },
  github: {
    '&:hover': {
      color: '#c9510c'
    }
  },
  stack: {
    '&:hover': {
      color: '#1e88e5'
    }
  }
});

export default withStyles(styles)(Footer);
