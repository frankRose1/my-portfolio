import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Root from './Root';
import { SERVER_URL } from './config';
import { LOCAL_STATE_QUERY } from './graphql';
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
  uri: SERVER_URL,
  request: operation => {
    const token = localStorage.getItem('authToken') || '';
    operation.setContext({
      headers: {
        Authorizaton: `JWT ${token}`
      }
    });
  },
  clientState: {
    resolvers: {
      Mutation: {
        toggleSearch(_, variables, { cache }) {
          // take the earchOpen bool from cache, toggle it, then write back to cache
          const { searchOpen } = cache.readQuery({ query: LOCAL_STATE_QUERY });
          const data = { data: { searchOpen: !searchOpen } };
          cache.writeData(data);
          return data;
        }
      }
    },
    defaults: {
      searchOpen: false
    }
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Root />
  </ApolloProvider>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
