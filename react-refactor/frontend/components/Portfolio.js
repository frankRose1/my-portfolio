import React from 'react';
import { Query } from 'react-apollo';
import { INFINITE_SCROLL_PROJECTS } from '../graphql/queries';
import Container from './styles/Container';
import Loading from './Loading';
import ProjectCard from './ProjectCard';
import PageTitle from './styles/PageTitle';
import { ProjectLayout } from './styles/PortfolioStyles';

const Portfolio = () => {
  const pageSize = 4;
  let pageNum = 1;

  const showMoreProjects = fetch => {
    pageNum += 1;
    fetch({
      variables: {
        pageSize,
        pageNum
      },
      //combine new results with the prev results
      updateQuery: (prevResult, { fetchMoreResult }) => {
        const newProjects = fetchMoreResult.infiniteScrollProjects.projects;
        const hasMore = fetchMoreResult.infiniteScrollProjects.hasMore;
        return {
          infiniteScrollProjects: {
            hasMore,
            projects: [
              ...prevResult.infiniteScrollProjects.projects,
              ...newProjects
            ],
            __typename: prevResult.infiniteScrollProjects.__typename
          }
        };
      }
    });
  };

  return (
    <Container>
      <Query
        query={INFINITE_SCROLL_PROJECTS}
        variables={{ pageNum, pageSize }}
        fetchPolicy='cache-and-network'
      >
        {({ data, loading, error, fetchMore }) => {
          if (loading) return <Loading />;

          if (error) return <p>Error</p>;

          return (
            <>
              <PageTitle>My Portfolio</PageTitle>

              {/* Project Cards */}
              <ProjectLayout>
                {data.infiniteScrollProjects.projects.map(project => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </ProjectLayout>

              {/* Show More button */}
              {data.infiniteScrollProjects.projects &&
                data.infiniteScrollProjects.hasMore && (
                  <button
                    onClick={() => showMoreProjects(fetchMore)}
                    disabled={loading}
                  >
                    Show More
                  </button>
                )}
            </>
          );
        }}
      </Query>
    </Container>
  );
};

export default Portfolio;
