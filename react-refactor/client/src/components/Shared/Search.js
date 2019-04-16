import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';
import { ApolloConsumer, Query, Mutation } from 'react-apollo';
import debounce from 'lodash.debounce';
import DownShift, { resetIdCounter } from 'downshift';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import DropdownItem from './DropdownItem';
import {
  LOCAL_STATE_QUERY,
  TOGGLE_SEARCH_MUTATION,
  SEARCH_PROJECTS_QUERY
} from '../../graphql';

function routeToItem(item, history) {
  history.push(`/project/${item._id}`);
}

const Search = ({ classes, history }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  /**
   *
   * @param {object} e - event object
   * @param {object} client - apollo client, used to manually fire search query
   */
  const handleInputChange = debounce(async (e, client) => {
    setLoading(true);
    const res = await client.query({
      query: SEARCH_PROJECTS_QUERY,
      variables: { searchTerm: e.target.value }
    });
    setResults(res.data.searchProjects);
    setLoading(false);
  }, 400);

  return (
    <Query query={LOCAL_STATE_QUERY}>
      {({ data }) => (
        <div
          style={{
            transform: !data.searchOpen ? 'translateX(100%)' : 'translateX(0)'
          }}
          className={classes.root}
        >
          {/* Search Header */}
          <header className={classes.header}>
            <Typography variant='h4' color='secondary'>
              Search Some Of My Projects!
            </Typography>
            <Mutation mutation={TOGGLE_SEARCH_MUTATION}>
              {toggleSearch => (
                <IconButton
                  onClick={toggleSearch}
                  title='Close search'
                  size='medium'
                >
                  <CloseIcon />
                </IconButton>
              )}
            </Mutation>
          </header>

          {/* DownShift */}
          <DownShift
            onChange={item => routeToItem(item, history)}
            itemToString={item => (item === null ? '' : item.title)}
          >
            {({
              getInputProps,
              getItemProps,
              isOpen,
              inputValue,
              highlightedIndex
            }) => (
              <div>
                {/* Search Input */}
                <ApolloConsumer>
                  {client => (
                    <input
                      {...getInputProps({
                        className: classes.searchInput,
                        placeholder: 'React, Node, GraphQL, etc',
                        type: 'search',
                        id: 'search',
                        onChange: e => {
                          e.persist();
                          handleInputChange(e, client);
                        }
                      })}
                    />
                  )}
                </ApolloConsumer>
                {/* // Search Results */}
                {isOpen && (
                  <div className={classes.dropdown}>
                    {results.map((item, i) => (
                      <DropdownItem {...getItemProps({ item })} key={item._id}>
                        <img width='50' src={item.imageUrl} alt={item.title} />
                        {item.title}
                      </DropdownItem>
                    ))}

                    {!results.length && !loading && (
                      <DropdownItem>
                        No results found for "{inputValue}"
                      </DropdownItem>
                    )}
                  </div>
                )}
              </div>
            )}
          </DownShift>
        </div>
      )}
    </Query>
  );
};

const styles = theme => ({
  root: {
    position: 'fixed',
    zIndex: 30,
    top: 0,
    right: 0,
    bottom: 0,
    height: '100%',
    width: '40%',
    minWidth: '500px',
    transition: 'transform 0.3s ease-in-out',
    backgroundColor: '#fff',
    boxShadow: '0 0 10px 3px rgba(0, 0, 0, 0.2)'
  },
  header: {
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    borderBottom: `5px solid ${theme.palette.dark.main}`
  },
  searchInput: {
    background: theme.palette.light.main,
    width: '100%',
    padding: '8px',
    border: 0,
    borderBottom: `2px solid ${theme.palette.dark.main}`,
    fontSize: '1.1rem',
    transition: 'background 0.4s ease-in-out',
    '&:focus': {
      background: 'lightgrey'
    },
    dropdown: {
      position: 'absoulte',
      width: '100%',
      border: `1px solid ${theme.palette.dark.main}`
    }
  }
});

export default withRouter(withStyles(styles)(Search));
