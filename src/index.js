const { ApolloServer } = require('apollo-server');
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

const prisma = new PrismaClient()


const resolvers = {
    Query,
    User,
    Mutation,
    Link,
    Risk,
    DefenseProfile
  }

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers,
    // DATABASE & AUTHENTICATION
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
    console.log(`🚀 Server is running on ${url}`)
);