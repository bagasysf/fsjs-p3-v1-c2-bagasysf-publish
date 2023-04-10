import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://rumaisho-mobile.rumaisho.shop/',
  cache: new InMemoryCache(),
});
