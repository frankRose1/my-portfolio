import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Query } from 'react-apollo';
import format from 'date-fns/format';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';

import Loading from '../Shared/Loading';
import Error from '../Shared/Error';
import NotFound from '../Shared/NotFound';
import { PROJECT_DETAIL_QUERY } from '../../graphql';

const ProjectDetail = ({ classes, match }) => {
  const { projectId } = match.params;

  const formatDate = timestamp =>
    format(new Date(parseInt(timestamp)), 'MMMM D, YYYY');

  return (
    <Query query={PROJECT_DETAIL_QUERY} variables={{ projectId }}>
      {({ data, loading, error }) => {
        if (loading) return <Loading />;
        if (error) return <Error error={error} />;

        const { fetchProjectById: project } = data;
        console.log(project);
        return project ? (
          <Card className={classes.card} raised={true}>
            <CardHeader
              title={project.title}
              subheader={formatDate(project.dateAdded)}
              action={
                <div className={classes.actions}>
                  {project.githubLink && (
                    <a
                      className={classes.projectLink}
                      href={project.githubLink}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <span>
                        <i className='devicon-github-plain github' />
                      </span>
                      View Code
                    </a>
                  )}
                  {project.demoLink && (
                    <a
                      className={classes.projectLink}
                      href={project.demoLink}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <span>
                        <i className='fas fa-desktop' />
                      </span>
                      Live Demo
                    </a>
                  )}
                </div>
              }
            />
            <CardMedia
              className={classes.projectImage}
              image={project.imageUrl}
              title={project.title}
            />
            <CardContent>
              <div className={classes.chips}>
                {project.tags.map((tag, i) => (
                  <Chip key={i} color='secondary' label={tag} />
                ))}
              </div>
              <Divider />
              <Typography component='p'>{project.description}</Typography>
            </CardContent>
          </Card>
        ) : (
          <NotFound />
        );
      }}
    </Query>
  );
};

const styles = theme => ({
  card: {
    maxWidth: '1150px',
    margin: '200px auto'
  },
  projectImage: {
    height: '400px'
  },
  actions: {
    padding: '16px'
  },
  chips: {
    marginBottom: '5px',
    padding: '5px',
    '& div': {
      marginRight: '4px'
    }
  },
  projectLink: {
    textDecoration: 'none',
    padding: '10px 20px',
    textAlign: 'center',
    backgroundColor: '#ddd',
    color: '#222',
    borderRadius: '5px',
    marginLeft: '15px',
    transition: 'background-color 0.3s ease-in, color 0.4s ease-in',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.light.main
    },
    '& i': {
      fontSize: '18px'
    },
    '& span': {
      marginRight: '5px'
    }
  }
});

export default withStyles(styles)(ProjectDetail);
