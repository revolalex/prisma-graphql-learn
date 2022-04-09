
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
* [Screenshots](#screenshots)
* [Technologies](#technologies-stack)
* [Model graphql](#model-graphql)
* [Model prisma](#model-prisma)
* [Commands to know](#commands-to-know)
* [Querries](#querries)
* [Mutations](#mutations)
* [Contact](#contact)


## General info

The Api stack: node.js, express, apollo-server, prisma, graphQl...

Clone the repos, then run 
`npm install`

To run the project: 
`npm run start`

Have a look to your databes using prisma studio: 
`npx prisma studio`


## Screenshots

http://localhost:4000/:

<img width="1136" alt="countryName" src="https://user-images.githubusercontent.com/56839789/162580896-52e8e64f-a4da-4bc6-a62d-58ae7f03b741.png">

Prisma studio: http://localhost:5555

<img width="1196" alt="Capture d’écran 2022-04-09 à 17 38 43" src="https://user-images.githubusercontent.com/56839789/162581028-448b5290-9987-416e-8e82-818f25d20766.png">


## Technologies Stack
* node
* express
* prisma
* appollo-server
* jsonwebtoken 
* graphQl

## Model GraphQl:

```js
type User {
  id: ID!
  name: String!
  email: String!
}
```

## Model Prisma:

```js
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
}
```

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

### start the server
`npm run start`

## Querries
### get links with data
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

### Authentification
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

### Request using header token
#### Post a new link
<img width="1196" alt="Capture d’écran 2022-04-09 à 18 08 07" src="https://user-images.githubusercontent.com/56839789/162582025-5afee5e2-924e-426e-998a-7ad30ece9997.png">



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



