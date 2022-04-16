const { shield } = require('graphql-shield');
const { isAdmin } = require('./rules');

// list the permissions for all queries and mutations
const permissions = shield({
    Query: {
        getDefenseProfiles: isAdmin
    },
    Mutation: {
 
    },
})

module.exports = {
    permissions
};