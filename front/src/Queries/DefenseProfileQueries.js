import { gql } from '@apollo/client';

const PostDefenseProfiles = gql`
    mutation postDefenseProfile($name: String!, $level: String!) {
        postDefenseProfile(name:$name, level:$level) {
            id,
            name,
            level,
            postedBy{
                name
            }
        }
    }   
    `;

const GetDefenseProfiles = gql`
    query{
        getDefenseProfiles{
            id,
            name,
            level,
            postedBy{
                id,
                name,
                email,
                role,
            }
        }        
    }`;

export { PostDefenseProfiles, GetDefenseProfiles };