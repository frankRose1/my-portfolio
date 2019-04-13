import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import withStyles from '@material-ui/core/styles/withStyles';

const Error = ({ classes, error }) => {
  const [open, setOpen] = useState(true);

  return (
    <Snackbar
      open={open}
      message={error.message}
      className={classes.snackbar}
      action={
        <Button onClick={() => setOpen(false)} color='secondary' size='small'>
          Close
        </Button>
      }
    />
  );
};

const styles = theme => ({
  snackbar: {
    margin: theme.spacing.unit
  }
});

export default withStyles(styles)(Error);
