import { gql } from '@apollo/client';

const GetUsers = gql`
query{
    getUsers{
        id,
        name,
        email,
        role,
        risk{id}

    }
}`;

const DeleteUser = gql`
mutation deleteUser($id: ID!){
    deleteUser(id:$id){
        id,
    }
}`;

export { DeleteUser, GetUsers };