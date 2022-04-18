import { gql } from '@apollo/client';

const PostRisk = gql`
    mutation postRisk($name: String!, $value: Int!) {
    postRisk(name: $name, value: $value) {
        name,
        value,
        postedBy {
        id,
        name,
        }
    }
    }
`;

const GetRisks = gql`
    query{
        getRisks{
            id,
            name,
            value, 
            postedBy{id,name,email}
        }
    }`;

const DeleteRisk = gql`
    mutation deleteRisk($id: ID!){
        deleteRisk(id:$id){
            id,
        }
    }`;

export { PostRisk, GetRisks, DeleteRisk };

