import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { ApolloProvider } from 'react-apollo';
import { SEARCH_PROJECTS_QUERY } from '../../graphql';

const Search = ({ classes }) => {
  const [search, setSearch] = useState('');

  return (
    <div className={classes.root}>
      <input
        className={classes.searchInput}
        placeholder='Search projects by keyword (React, Node, GraphQL, etc)'
        type='search'
      />
    </div>
  );
};

const styles = theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    borderBottom: '3px solid lightgrey',
    position: 'relative'
  },
  searchInput: {
    background: theme.palette.light.main,
    width: '100%',
    padding: '8px',
    border: 0,
    fontSize: '1.1rem',
    transition: 'background 0.4s ease-in-out',
    '&:focus': {
      background: 'lightgrey'
    }
  }
});

export default withStyles(styles)(Search);
