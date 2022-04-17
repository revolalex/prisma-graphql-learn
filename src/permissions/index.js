const {  shield, rule, and, or  } = require('graphql-shield');
const { isAdmin, isStaf } = require('./rules');
// and - allows access only if all sub rules used return true,
// or - resolves to true if at least one rule passes,

// list the permissions for all queries and mutations
const permissions = shield({
    Query: {
        getDefenseProfiles:  or (isStaf,isAdmin),
    },
    Mutation: {
 
    },
})

module.exports = {
    permissions
};