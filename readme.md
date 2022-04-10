
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
* [Technologies](#technologies-stack)
* [Prisma](#prisma)
* [Model prisma](#model-prisma)
* [Model graphql](#model-graphql)
* [Apollo server](#apollo-server)
* [Commands to know](#commands-to-know)
* [Querries](#querries)
* [Mutations](#mutations)
* [Screenshots](#screenshots)
* [Contact](#contact)

## Description
This project goal was to create an API REST using graphql.
To communicate with the DB i use prisma, i also use apollo-server as graphql server. 
So you have different model:
 - user
 - risk (with relation to user)
 - defenseProfile (with relation to user)
 - link ((with relation to user)

I also implement authentification using JWT

You can create an user,login, create link, a risk, and a defense profil 


## General info

The Api stack: node.js, express, apollo-server, prisma, graphQl...

Clone the repos, then run 
`npm install`

To run the project: 
`npm run start`

Have a look to your databes using prisma studio: 
`npx prisma studio`


## Technologies Stack
* node
* express
* prisma
* appollo-server
* jsonwebtoken 
* graphQl

## Prisma
#### Next-generation Node.js and TypeScript ORM (Object Relational Mapping).
Prisma helps app developers build faster and make fewer errors with an open source database toolkit for PostgreSQL, MySQL, SQL Server, SQLite and MongoDB 

<a href="https://www.prisma.io/">documenation</a>

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

#### What for
- A stand-alone GraphQL server, including in a serverless environment
- An add-on to your application's existing Node.js middleware (such as Express or Fastify)
- A gateway for a federated graph

#### What he provide
- Straightforward setup, so your client developers can start fetching data quickly
- Incremental adoption, allowing you to add features as they're needed
- Universal compatibility with any data source, any build tool, and any GraphQL client
- Production readiness, enabling you to ship features faster

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

#### Authentification
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

<img width="1156" alt="Capture d’écran 2022-04-10 à 11 19 41" src="https://user-images.githubusercontent.com/56839789/162611478-f68b10d4-75bd-4e56-8fad-d8813ed027cc.png">


#### Post a new link (Request using header token)
<img width="1196" alt="Capture d’écran 2022-04-09 à 18 08 07" src="https://user-images.githubusercontent.com/56839789/162582025-5afee5e2-924e-426e-998a-7ad30ece9997.png">

## Screenshots

Playground graphql => http://localhost:4000/:

<img width="1136" alt="countryName" src="https://user-images.githubusercontent.com/56839789/162580896-52e8e64f-a4da-4bc6-a62d-58ae7f03b741.png">

Prisma studio to visualize the DB => http://localhost:5555

<img width="1196" alt="Capture d’écran 2022-04-09 à 17 38 43" src="https://user-images.githubusercontent.com/56839789/162581028-448b5290-9987-416e-8e82-818f25d20766.png">

## What I learn, pratice: 

- Database
- Sever
- GgraphQL
- prisma
- appollo-server
- jwt
- node
 
 
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



