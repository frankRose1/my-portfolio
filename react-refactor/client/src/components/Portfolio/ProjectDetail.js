import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Query } from 'react-apollo';
import Loading from '../Shared/Loading';
import Error from '../Shared/Error';
import NotFound from '../Shared/NotFound';
import { PROJECT_DETAIL_QUERY } from '../../graphql';

const ProjectDetail = ({ classes, match }) => {
  const { projectId } = match.params;
  return (
    <Query query={PROJECT_DETAIL_QUERY} variables={{ projectId }}>
      {({ data, loading, error }) => {
        if (loading) return <Loading />;
        if (error) return <Error error={error} />;

        const { fetchProjectById: project } = data;
        console.log(project);
        return (
          <div>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
          </div>
        );
      }}
    </Query>
  );
};

const styles = theme => ({
  root: {
    backgroundColor: 'red'
  }
});

export default withStyles(styles)(ProjectDetail);
