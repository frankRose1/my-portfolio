import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import HeroImage from '../../static/hero-cover2.jpg';

const Hero = ({ classes }) => (
  <section className={classes.root}>
    <div className={classes.intro}>
      <h1 className={classes.title}>
        FullStack Developer With a Love For Code
      </h1>
      <h3 className={classes.subTitle}>Let's Create Something Amazing</h3>
    </div>
  </section>
);

const styles = theme => ({
  root: {
    height: '100vh',
    width: '100%',
    backgroundImage: `linear-gradient( rgba(0, 0, 0, .65), rgba(0, 0, 0, .65) ), url(${HeroImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative'
  },
  intro: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '90%',
    transform: 'translate(-50%,-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '15px',
    color: '#fff',
    textAlign: 'center'
  },
  title: {
    fontWeight: '900',
    fontSize: '2.5rem'
  },
  subTitle: {
    fontWeight: '300',
    fontSize: '1.8rem'
  }
});

export default withStyles(styles)(Hero);
