import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

const DropdownItem = ({ classes, highlighted, children }) => (
  <div className={classes.root}>{children}</div>
);

const styles = theme => ({
  root: {
    borderBottom: `1px solid ${props => props.theme.lightgrey}`,
    backgroundColor: '#f7f7f7',
    // background: ${ props => (props.highlighted ? '#f7f7f7' : 'white') },
    padding: '1rem',
    transition: 'all 0.2s',
    // ${ props => (props.highlighted ? 'padding-left: 2rem;' : null) },
    display: 'flex',
    alignItems: 'center',
    borderLeft: '10px solid white',
    // borderLeft: '10px solid ${ props => (props.highlighted ? props.theme.lightgrey : 'white') }',
    '& img': {
      marginRight: '10px'
    }
  }
});

export default withStyles(styles)(DropdownItem);
