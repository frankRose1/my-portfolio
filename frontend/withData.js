import withApollo from 'next-with-apollo';
import ApolloClient from 'apollo-boost';
import { SERVER_URL } from './config';

function createClient({ headers }) {
  return new ApolloClient({
    uri: SERVER_URL,
    request: opertaion => {
      opertaion.setContext({
        fetchOptions: {
          credentials: 'include'
        },
        headers
      });
    }
  });
}

export default withApollo(createClient);
