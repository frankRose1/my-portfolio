import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Search from './Search';
import { TOGGLE_SEARCH_MUTATION } from '../../graphql';

const Header = ({ classes }) => {
  return (
    <header className={classes.root}>
      <nav className={classes.navBar}>
        {/* Logo */}
        <Link to='/'>
          <Typography className={classes.logo} variant='h3' noWrap>
            {'{F/R}'}
          </Typography>
        </Link>
        {/* Menu */}
        <ul className={classes.navMenu}>
          <li>
            <NavLink className={classes.link} to='/skills'>
              Skills
            </NavLink>
          </li>
          <li>
            <NavLink className={classes.link} to='/portfolio'>
              Portfolio
            </NavLink>
          </li>
          <li>
            <NavLink className={classes.link} to='/contact'>
              Contact
            </NavLink>
          </li>
          <li>
            <Mutation mutation={TOGGLE_SEARCH_MUTATION}>
              {toggleSearch => (
                <button
                  title='Search some of my projects'
                  onClick={toggleSearch}
                >
                  Search
                </button>
              )}
            </Mutation>
          </li>
        </ul>
      </nav>
      <Search />
    </header>
  );
};

const styles = theme => ({
  root: {
    background: 'transparent',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 50,
    width: '100%'
  },
  navBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1100px',
    margin: '0 auto',
    '& a, & button': {
      textDecoration: 'none',
      textTransform: 'uppercase',
      color: '#fff'
    },
    '& button': {
      outline: 'none',
      border: 0,
      cursor: 'pointer',
      background: 'none'
    }
  },
  navMenu: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '350px',
    '& a': {
      borderBottom: 'transparent 2px solid',
      paddingBottom: '10px',
      transition: 'border-bottom 0.3s ease-in-out',
      '&:hover': {
        borderBottom: `${theme.palette.info.main} 2px solid`
      }
    },
    '& a.active': {
      borderBottom: `${theme.palette.info.main} 2px solid`
    }
  },
  logo: {
    fontSize: 30,
    color: '#fff'
  }
});

export default withStyles(styles)(Header);

// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// const Header = ({ classes }) => {
//   return (
//     <AppBar position='static' className={classes.root}>
//       <Toolbar>
//         {/* Logo */}
//         <Link to='/' className={classes.grow}>
//           <Typography className={classes.logo} variant='headline' noWrap>
//             {'{F/R}'}
//           </Typography>
//         </Link>
//         <ul className={classes.links}>
//           <li>
//             <Link className={classes.link} to='/skills'>
//               Skills
//             </Link>
//           </li>
//           <li>
//             <Link className={classes.link} to='/portfolio'>
//               Portfolio
//             </Link>
//           </li>
//           <li>
//             <Link className={classes.link} to='/contact'>
//               Contact
//             </Link>
//           </li>
//         </ul>
//       </Toolbar>
//       <Search />
//     </AppBar>
//   );
// };
