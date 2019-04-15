import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';

const PageTransition = ({ children, location, classes }) => (
  <div className={classes.transitionStyles}>
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        timeout={{ enter: 300, exit: 300 }}
        classNames='fade'
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  </div>
);

const styles = theme => ({
  transitionStyles: {
    '& .fade-enter': {
      opacity: 0,
      zIndex: 1
    },

    '& .fade-enter.fade-enter-active': {
      opacity: 1,
      transition: ' opacity 300ms ease-in'
    },

    '& .fade-exit': {
      display: 'none'
    }
  }
});

export default withRouter(withStyles(styles)(PageTransition));
