import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Query } from 'react-apollo';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import ProjectCard from './ProjectCard';
import Loading from '../Shared/Loading';
import Error from '../Shared/Error';
import { INFINITE_SCROLL_PROJECTS_QUERY } from '../../graphql';

const Portfolio = ({ classes, history }) => {
  const pageSize = 4;
  let pageNum = 1;

  const routeToProject = projectId => {
    history.push(`/project/${projectId}`);
  };

  const handleShowMore = fetch => {
    pageNum += 1;
    fetch({
      variables: {
        pageSize,
        pageNum
      },
      // combine new results with the old results
      updateQuery: (prevResult, { fetchMoreResult }) => {
        const newProjects = fetchMoreResult.infiniteScrollProjects.projects;
        const hasMore = fetchMoreResult.infiniteScrollProjects.hasMore;
        return {
          infiniteScrollProjects: {
            __typename: prevResult.infiniteScrollProjects.__typename,
            hasMore,
            projects: [
              ...prevResult.infiniteScrollProjects.projects,
              ...newProjects
            ]
          }
        };
      }
    });
  };

  return (
    <Query
      query={INFINITE_SCROLL_PROJECTS_QUERY}
      variables={{ pageSize, pageNum }}
    >
      {({ data, loading, error, fetchMore }) => {
        if (loading) return <Loading />;
        if (error) return <Error error={error} />;

        return (
          <>
            <Grid container direction='row' xs={12} sm={6} spacing={40}>
              {/* Project Cards */}
              {data.infiniteScrollProjects.projects.map(project => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  routeToProject={() => routeToProject(project._id)}
                />
              ))}
            </Grid>

            {/* Fetch More Button */}
            {data.infiniteScrollProjects.projects.length &&
              data.infiniteScrollProjects.hasMore && (
                <Button
                  onClick={() => handleShowMore(fetchMore)}
                  color='secondary'
                  disabled={loading}
                  size='medium'
                >
                  Show More
                </Button>
              )}
          </>
        );
      }}
    </Query>
  );
};

const styles = theme => ({
  root: {}
});

export default withStyles(styles)(Portfolio);
