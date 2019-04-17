import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Mail';
import FolderIcon from '@material-ui/icons/Folder';
import CodeIcon from '@material-ui/icons/Code';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

function ListItemLink(props) {
  return <ListItem button component={NavLink} {...props} />;
}

const Header = ({ classes }) => {
  const desktopListItems = [
    { to: '/skills', text: 'Skills', Icon: CodeIcon },
    { to: '/portfolio', text: 'Portfolio', Icon: FolderIcon },
    { to: '/contact', text: 'Contact', Icon: MailIcon }
  ];

  return (
    <AppBar position='static' className={classes.root}>
      <Toolbar>
        {/* Logo */}
        <Link to='/' style={{ textDecoration: 'none' }}>
          <Typography
            className={classes.title}
            variant='h6'
            color='inherit'
            noWrap
          >
            {'{F/R}'}
          </Typography>
        </Link>

        <div className={classes.grow} />

        {/* Search */}
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder='Search projects(node, react, graphql, etc)'
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
          />
        </div>

        <div className={classes.grow} />

        {/* Menu */}
        <div className={classes.sectionDesktop}>
          <List component='nav' className={classes.navMenu}>
            {desktopListItems.map(item => (
              <ListItemLink to={item.to} key={item.text}>
                <ListItemIcon className={classes.navItemIcon}>
                  <item.Icon />
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemLink>
            ))}
          </List>
        </div>
      </Toolbar>
    </AppBar>
  );
};

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  title: {
    display: 'none',
    color: '#fff',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  navMenu: {
    display: 'flex',
    '& a': {
      color: '#fff !important'
    }
  },
  navItemIcon: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto'
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  }
});

export default withStyles(styles)(Header);

// import { Mutation } from 'react-apollo';
// import withStyles from '@material-ui/core/styles/withStyles';
// import Typography from '@material-ui/core/Typography';
// import Toolbar from '@material-ui/core/Toolbar';
// import AppBar from '@material-ui/core/AppBar';
// import Search from './Search';
// import { TOGGLE_SEARCH_MUTATION } from '../../graphql';
// const Header = ({ classes }) => {
//   return (
//     <header className={classes.root}>
//       <nav className={classes.navBar}>
//         {/* Logo */}
//         <Link to='/'>
//           <Typography className={classes.logo} variant='h3' noWrap>
//             {'{F/R}'}
//           </Typography>
//         </Link>
//         {/* Menu */}
//         <ul className={classes.navMenu}>
//           <li>
//             <NavLink className={classes.link} to='/skills'>
//               Skills
//             </NavLink>
//           </li>
//           <li>
//             <NavLink className={classes.link} to='/portfolio'>
//               Portfolio
//             </NavLink>
//           </li>
//           <li>
//             <NavLink className={classes.link} to='/contact'>
//               Contact
//             </NavLink>
//           </li>
//           <li>
//             <Mutation mutation={TOGGLE_SEARCH_MUTATION}>
//               {toggleSearch => (
//                 <button
//                   title='Search some of my projects'
//                   onClick={toggleSearch}
//                 >
//                   Search
//                 </button>
//               )}
//             </Mutation>
//           </li>
//         </ul>
//       </nav>
//       <Search />
//     </header>
//   );
// };

// const styles = theme => ({
//   root: {
//     background: 'transparent',
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     zIndex: 50,
//     width: '100%'
//   },
//   navBar: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     maxWidth: '1100px',
//     margin: '0 auto',
//     '& a, & button': {
//       textDecoration: 'none',
//       textTransform: 'uppercase',
//       color: '#fff'
//     },
//     '& button': {
//       outline: 'none',
//       border: 0,
//       cursor: 'pointer',
//       background: 'none'
//     }
//   },
//   navMenu: {
//     listStyle: 'none',
//     display: 'flex',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     width: '350px',
//     '& a': {
//       borderBottom: 'transparent 2px solid',
//       paddingBottom: '10px',
//       transition: 'border-bottom 0.3s ease-in-out',
//       '&:hover': {
//         borderBottom: `${theme.palette.info.main} 2px solid`
//       }
//     },
//     '& a.active': {
//       borderBottom: `${theme.palette.info.main} 2px solid`
//     }
//   },
//   logo: {
//     fontSize: 30,
//     color: '#fff'
//   }
// });
