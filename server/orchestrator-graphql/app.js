const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const {
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
} = require('./schemas/user');

const {
  typeDefs: appTypeDefs,
  resolvers: appResolvers,
} = require('./schemas/app');

(async () => {
  const server = new ApolloServer({
    typeDefs: [userTypeDefs, appTypeDefs],
    resolvers: [userResolvers, appResolvers],
    introspection: true,
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.PORT || 4000 },
  });
  console.log(`🚀  Server ready at: ${url}`);
})();
