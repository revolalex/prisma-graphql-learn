import { gql } from '@apollo/client';

const SignUpQuery = gql`
    mutation signup($name: String!, $password: String!, $email: String!,  $role: String!) {
    signup(name: $name, password: $password, email: $email, role: $role) {
        token
        user {
            name
            role
            id
        }
    }
    }
    `;

const LoginQuery = gql`
    mutation login($email: String!, $password: String!){
    login(email: $email, password: $password) {
        token
            user {
                id
                name
                role
            }
    }
    }`;


export { LoginQuery , SignUpQuery  };