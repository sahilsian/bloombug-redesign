import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

// This file creates an instance of the client. A client is responsible for picking up and sending requests. This client directly communicates with the graphql plugin on wordpress

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.WORDPRESS_API_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  }),
  cache: new InMemoryCache(),
});

export default client;