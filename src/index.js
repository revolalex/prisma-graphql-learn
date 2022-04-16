const { ApolloServer, makeExecutableSchema } = require('apollo-server');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client')
const { getUserId } = require('./utils');
const Query = require('./resolvers/Query')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Risk = require('./resolvers/Risk')
const Mutation = require('./resolvers/Mutation')
const DefenseProfile = require('./resolvers/DefenseProfile')
const { applyMiddleware } = require('graphql-middleware');
const {permissions} = require('./permissions');

const prisma = new PrismaClient()

// add all the resolvers
const resolvers = {
  Query,
  User,
  Mutation,
  Link,
  Risk,
  DefenseProfile
}
// read the schema.graphql file
const typeDefs = fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf-8')

// schema 
const schema = makeExecutableSchema({ typeDefs, resolvers })

// add permissions
const schemaWithPermissions = applyMiddleware(schema, permissions)

const server = new ApolloServer({
  schema: schemaWithPermissions,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      userId:
        req && req.headers.authorization
          ? getUserId(req)
          : null
    };
  }
})

server.listen().then(({ url }) =>
  console.log(`🚀 Server is running on ${url}\n⭐️`)
);