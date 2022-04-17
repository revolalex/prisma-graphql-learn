
![](https://img.shields.io/badge/made%20with-javaScript-yellow?logo=javaScript).
![](https://img.shields.io/badge/made%20with-node.js-success?logo=node.js).
![](https://img.shields.io/badge/made%20with-graphQl-pink?logo=graphQl).
![](https://img.shields.io/badge/made%20with-express-yellow?logo=express).
![](https://img.shields.io/badge/made%20with-prisma-violet?logo=prisma).
![](https://img.shields.io/badge/made%20with-apollo-blue?logo=apollo).


# Project Name : Api GraphQl, Prisma, Apollo
> This project's main goal was to learn new techno.


## Table of contents
* [General info](#general-info)
* [API stack](#api-stack)
* [Prisma](#prisma)
* [Model prisma](#model-prisma)
* [Model graphql](#model-graphql)
* [Apollo server](#apollo-server)
* [How Prisma and Apollo fit together](#how-prisma-and-apollo-fit-together)
* [Commands to know](#commands-to-know)
* [Querries](#querries)
* [Mutations](#mutations)
* [Authentfication token](#authentfication-token)
* [API Middlware](#api-middleware)
* [Front](#front-end)
* [Screenshots](#screenshots)
* [Contact](#contact)

## Description
This project goal was to create an API using graphql.
To communicate with the DB i use prisma, i also use apollo-server as graphql server. 
So you have different model:
 - user
 - risk (with relation to user)
 - defenseProfile (with relation to user)
 - link (with relation to user)

I also implement authentification using JWT

You can create an user,login, create link, a risk, and a defense profil 


## General info

The Api stack: node.js, express, apollo-server, prisma, graphQl...
The Front-end stack: react, axios, bootstap...

Clone the repos, then run 
`npm install`

To run the api: 
`npm run start`

To run the front: 
`cd front npm run start`

Have a look to your databes using prisma studio: 
`npx prisma studio`

## API Stack
* node
* express
* prisma
* appollo-server
* jsonwebtoken 
* graphQl

## Prisma
#### Next-generation Node.js and TypeScript ORM (Object Relational Mapping).
Prisma helps app developers build faster and make fewer errors with an open source database toolkit for PostgreSQL, MySQL, SQL Server, SQLite and MongoDB 

<a href="https://www.prisma.io/" target="_blank">Doc</a>

#### What is Prisma
To be short prisma is use to send queries to our database
- Prisma Client: Auto-generated and type-safe query builder for Node.js & TypeScript
- Prisma Migrate: Migration system
- Prisma Studio: GUI to view and edit data in your database

#### Data model you can read
Central to Prisma is the schema - a declarative way to define your app's data models and their relations that's human-readable. 

<img width="671" alt="Capture d’écran 2022-04-10 à 10 54 03" src="https://user-images.githubusercontent.com/56839789/162610557-9f48623d-a901-492e-8767-81245a893201.png">

## Model Prisma

```js
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
}
```

## Model GraphQl

```js
type User {
  id: ID!
  name: String!
  email: String!
}
```



## Apollo server

#### What is apollo server
Apollo Server is an open-source, GraphQL server that's compatible with any GraphQL client, It's the best way to build a production-ready, self-documenting GraphQL API that can use data from any source.

<a href="https://www.apollographql.com/" target="_blank">Doc</a>

#### What for
- A stand-alone GraphQL server, including in a serverless environment
- An add-on to your application's existing Node.js middleware (such as Express or Fastify)
- A gateway for a federated graph

#### What he provide
- Straightforward setup, so your client developers can start fetching data quickly
- Incremental adoption, allowing you to add features as they're needed
- Universal compatibility with any data source, any build tool, and any GraphQL client
- Production readiness, enabling you to ship features faster


## How Prisma and Apollo fit together
Apollo provides a great ecosystem for building applications with GraphQL. When building GraphQL APIs with Apollo Server against a database, you need to send database queries inside your GraphQL resolvers – that's where Prisma comes in.


Prisma is an ORM that is used inside the GraphQL resolvers of your Apollo Server to query your database. It works perfectly with all your favorite tools and libraries from the GraphQL ecosystem. <a href='https://www.prisma.io/graphql' target='_blank'>Learn more about Prisma with GraphQL.</a>

![image](https://user-images.githubusercontent.com/56839789/163709826-e9b4b272-2415-4401-a837-ff4e67ed3a77.png)

<img width="1284" alt="Capture d’écran 2022-04-17 à 12 05 27" src="https://user-images.githubusercontent.com/56839789/163709906-7b79721c-82ee-4a1b-8db6-a71e73ce5545.png">

<a href="https://www.prisma.io/apollo" target="_blank">More Info</a>


## Commands to know

### Database
#### Migration
Example: 
`npx prisma migrate dev --name "add-user-model"`

Then: 
`npx prisma generate`


### Prisma studio
#### very useful to visualize your DB
`npx prisma studio`

#### start the server
`npm run start`

## Querries
#### Get links with data
```js
query {
  links {
    id
    url
    description
    postedBy{
      id
      name
      email
    }
  }
}
```

## Mutations

#### signup
```js
mutation {
  signup(name: "Alice", email: "alice@prisma.io", password: "graphql") {
    token
    user {
      id
    }
  }
}
```
#### Answer with token
<img width="1156" alt="Capture d’écran 2022-04-10 à 11 19 41" src="https://user-images.githubusercontent.com/56839789/162611478-f68b10d4-75bd-4e56-8fad-d8813ed027cc.png">


#### Post a new link (Request using header token)
<img width="1196" alt="Capture d’écran 2022-04-09 à 18 08 07" src="https://user-images.githubusercontent.com/56839789/162582025-5afee5e2-924e-426e-998a-7ad30ece9997.png">

## Authentfication token
Here come the jwt identification

For more detail: <a href="https://www.howtographql.com/graphql-js/6-authentication/" target="_blank">Link</a>

In utils.js file

```js
const jwt = require('jsonwebtoken');
const APP_SECRET = 'GraphQL-is-aw3some';

function getTokenPayload(token) {
  return jwt.verify(token, APP_SECRET);
}
// he getUserId function is a helper function that you’ll call in resolvers which 
// require authentication (such as post). It first retrieves the Authorization header 
// (which contains the User’s JWT) from the context. It then verifies the JWT 
// and retrieves the User’s ID from it. Notice that if that process is not successful 
// for any reason, the function will throw an exception. You can therefore use it to 
// “protect” the resolvers which require authentication.
function getUserId(req, authToken) {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      if (!token) {
        throw new Error('No token found');
      }
      const { userId } = getTokenPayload(token);
      return userId;
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken);
    return userId;
  }

  throw new Error('Not authenticated');
}

module.exports = {
  APP_SECRET,
  getUserId
};
```

Then in index.js file

```js
const server = new ApolloServer({
  schema: schemaWithPermissions,
  //This will allow your resolvers to read the Authorization header and validate 
  //if the user who submitted the request is eligible to perform the requested operation.
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      // getting the userId from the token
      userId:
        req && req.headers.authorization
          ? getUserId(req)
          : null
    };
  }
})
```



## API Middleware
I project we have a model user, the user can have different role ("ADMIN", "STAFF",, "VIEWER"). So i wanted to restrict the acces to certain request (permissions)

To handle the permission who can acces this query or this mutation, i used <a href="https://www.graphql-shield.com/">graphql-shield</a>

<img width="978" alt="Capture d’écran 2022-04-17 à 12 14 53" src="https://user-images.githubusercontent.com/56839789/163710189-3c1db0dd-2c05-450e-9dd2-a0edad11201f.png">

#### First modify the server

```js
const { ApolloServer, makeExecutableSchema } = require('apollo-server');
const { applyMiddleware } = require('graphql-middleware');
const {permissions} = require('./permissions');

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
```

#### Permissions

Create a Permissions folder then a index.js file inside

```js
const {  shield, rule, and, or  } = require('graphql-shield');
const { isAdmin, isStaf } = require('./rules');
// and - allows access only if all sub rules used return true,
// or - resolves to true if at least one rule passes,

// list the permissions for all queries and mutations
const permissions = shield({
    Query: {
        // the quey getDefenseProfiles allow only staff or admin role
        getDefenseProfiles:  or (isStaf,isAdmin),
    },
    Mutation: {
 
    },
})

module.exports = {
    permissions
};
````



#### Rules
Now inside Permissions folder create a new file rule.js

```js
const { rule } = require('graphql-shield');

const isAdmin = rule()(async (parent, args, context, info) => {
    const userData = context.prisma.user.findUnique({ where: { id: context.userId } })
    let userIsAdmin
    await userData.then(user => {
        console.log(user.role)
        user.role === "ADMIN" ? userIsAdmin = true : userIsAdmin = false
    })
    return userIsAdmin
})

const isStaf = rule()(async (parent, args, context, info) => {
    const userData = context.prisma.user.findUnique({ where: { id: context.userId } })
    let userRoleIsStaf
    await userData.then(user => {
        console.log(user.role)
        user.role === "STAFF" ? userRoleIsStaf = true : userRoleIsStaf = false
    })
    return userRoleIsStaf
})

module.exports = {
    isAdmin,
    isStaf
};
```

😎 Perfect we can now manage the acces of the api for different user role !! 😎 




## Front End

The front used react, axios, grapql, react-toastify, react-bootstrap...
With the frond end you have a login interface, then you can visualize, all risk, all defense profil.

You can also create a new risk, and a defense profil.

`cd front`

`npm run start`

#### Technologies:
-  axios
-  @appollo/client
-  grapql 
-  react-router
-  react-toastify
-  bootstrap, react-bootstrap


## Screenshots

Playground graphql => http://localhost:4000/:

<img width="1136" alt="countryName" src="https://user-images.githubusercontent.com/56839789/162580896-52e8e64f-a4da-4bc6-a62d-58ae7f03b741.png">

Prisma studio to visualize the DB => http://localhost:5555

<img width="1196" alt="Capture d’écran 2022-04-09 à 17 38 43" src="https://user-images.githubusercontent.com/56839789/162581028-448b5290-9987-416e-8e82-818f25d20766.png">

#### Front-end:
![front](https://user-images.githubusercontent.com/56839789/162727911-f1a7cfdf-5eda-47bc-84a8-f09ef615ae3d.gif)




## What I learn, pratice: 

- database
- sever
- graphQL
- prisma
- appollo-server
- jwt
- node
- bootstrap
- toastify
 
 
## Status
Project is:  _Finish_


## Contact	
- [![LinkedIn][linkedin-shield]][linkedin-url] 	
- revolalex@gmail.com




###### inspired by: https://www.howtographql.com/graphql-js/2-a-simple-query/

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/alexandre-rodrigueza/



