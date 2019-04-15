import React from 'react';
import { withStyles } from '@material-ui/core';

const SkillCards = ({ classes }) => {
  const front = [
    {
      icon: 'devicon-react-original',
      name: 'react'
    },
    {
      icon: 'devicon-vuejs-plain',
      name: 'vue'
    },
    {
      icon: 'devicon-html5-plain',
      name: 'html5'
    },
    {
      icon: 'devicon-css3-plain',
      name: 'css'
    },
    {
      icon: 'devicon-javascript-plain',
      name: 'javascript'
    }
  ];

  const back = [
    {
      icon: 'devicon-nodejs-plain',
      name: 'node'
    },
    {
      icon: 'devicon-express-original',
      name: 'express'
    },
    {
      icon: 'devicon-mongodb-plain',
      name: 'mongodb'
    },
    {
      icon: 'devicon-sequelize-plain',
      name: 'sequelize'
    },
    {
      icon: 'devicon-django-plain',
      name: 'django'
    },
    {
      icon: 'devicon-python-plain',
      name: 'python'
    }
  ];

  const other = [
    {
      icon: 'devicon-git-plain',
      name: 'git'
    },
    {
      icon: 'devicon-gulp-plain',
      name: 'gulp'
    },
    {
      icon: 'devicon-mocha-plain',
      name: 'mocha'
    }
  ];

  return (
    <div className={classes.root}>
      {/* frontend card */}
      <div className={classes.skillCard}>
        <h2>frontend</h2>
        <div className={classes.iconContainer}>
          {front.map(skill => (
            <i
              title={skill.name}
              key={skill.name}
              className={`${skill.icon} ${classes.icon}`}
            />
          ))}
        </div>
      </div>

      {/* backend card */}
      <div className={classes.skillCard}>
        <h2>backend</h2>
        <div className={classes.iconContainer}>
          {back.map(skill => (
            <i
              title={skill.name}
              key={skill.name}
              className={`${skill.icon} ${classes.icon}`}
            />
          ))}
        </div>
      </div>

      {/* other */}
      <div className={classes.skillCard}>
        <h2>tooling/testing</h2>
        <div className={classes.iconContainer}>
          {other.map(skill => (
            <i
              title={skill.name}
              key={skill.name}
              className={`${skill.icon} ${classes.icon}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr'
  },
  skillCard: {
    backgroundColor: '#fff',
    borderRight: '1px solid #cfd8dc',
    padding: '20px 15px',
    '& h2': {
      textTransform: 'uppercase',
      color: '#29a156',
      fontWeight: '600',
      fontSize: '1.1rem',
      '&:after': {
        content: '""',
        width: '45px',
        height: '2px',
        backgroundColor: '#29a156',
        display: 'block',
        marginTop: '10px',
        marginBottom: '35px'
      }
    }
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
    margin: '0 auto'
  },
  icon: {
    color: '#5d5f65',
    fontSize: '40px'
  }
});

export default withStyles(styles)(SkillCards);
