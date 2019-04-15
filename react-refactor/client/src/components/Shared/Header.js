import React from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Search from './Search';

const Header = ({ classes }) => {
  return (
    <AppBar position='static' className={classes.root}>
      <Toolbar>
        {/* Logo */}
        <Link to='/' className={classes.grow}>
          <Typography className={classes.logo} variant='headline' noWrap>
            {'{F/R}'}
          </Typography>
        </Link>
        <ul className={classes.links}>
          <li>
            <Link className={classes.link} to='/skills'>
              Skills
            </Link>
          </li>
          <li>
            <Link className={classes.link} to='/portfolio'>
              Portfolio
            </Link>
          </li>
          <li>
            <Link className={classes.link} to='/contact'>
              Contact
            </Link>
          </li>
        </ul>
      </Toolbar>
      <Search />
    </AppBar>
  );
};

const styles = theme => ({
  root: {
    margin: 0,
    padding: 0,
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#fff'
  },
  logo: {
    fontSize: 30,
    color: '#fff',
    textDecoration: 'none'
  },
  links: {
    margin: 0,
    padding: 0,
    justifySelf: 'end',
    display: 'flex',
    listStyle: 'none'
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#fff',
    position: 'relative',
    '&:after': {
      height: '2px',
      background: '#fff',
      content: '',
      width: 0,
      position: 'absolute',
      transform: 'translateX(-50%)',
      transition: 'width 0.4s',
      transitionTimingFunction: 'cubic-bezier(1, -0.65, 0, 2.31)',
      left: '50%',
      marginTop: '2rem'
    },
    '&:hover': {
      '&:after': {
        width: 'calc(100% - 60px)'
      }
    }
  }
});

export default withStyles(styles)(Header);
