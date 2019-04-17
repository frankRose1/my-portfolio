import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import withStyles from '@material-ui/core/styles/withStyles';

const Loading = ({ classes }) => (
  <div className={classes.root}>
    <CircularProgress size={100} thickness={5} />
  </div>
);

const styles = theme => ({
  root: {
    margin: '200px auto 0px auto',
    textAlign: 'center'
  }
});

export default withStyles(styles)(Loading);
