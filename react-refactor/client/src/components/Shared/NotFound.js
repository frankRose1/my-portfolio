import React from 'react';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

const NotFound = ({ classes }) => (
  <div className={classes.root}>
    <Typography variant='h4'>Sorry, this page isn't available.</Typography>
    <Typography variant='subtitle1'>
      The link you followed may be broken, or the page may have been removed.{' '}
      <Link className={classes.link} to='/'>
        Return home
      </Link>
      .
    </Typography>
  </div>
);

const styles = theme => ({
  root: {
    margin: '150px auto 0 auto',
    textAlign: 'center',
    color: '#000',
    maxWidth: '700px'
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main
  }
});

export default withStyles(styles)(NotFound);
