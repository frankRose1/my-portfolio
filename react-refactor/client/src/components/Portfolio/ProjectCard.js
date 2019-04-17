import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Query } from 'react-apollo';
import format from 'date-fns/format';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const ProjectCard = ({ classes, project, routeToProject }) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <Card raised={true}>
      <CardMedia
        onClick={routeToProject}
        className={classes.image}
        image={project.imageUrl}
        title={project.title}
      />
      <CardContent>
        <Typography>{project.title}</Typography>
      </CardContent>
    </Card>
  );
};

const styles = theme => ({
  root: {
    maxWidth: '400px'
  },
  image: {
    height: '30vh'
  }
});

export default withStyles(styles)(ProjectCard);
