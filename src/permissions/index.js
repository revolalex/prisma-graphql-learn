const {  shield, rule, and, or  } = require('graphql-shield');
const { isAdmin, isStaf, isOwner } = require('./rules');
// and - allows access only if all sub rules used return true,
// or - resolves to true if at least one rule passes,

// list the permissions for all queries and mutations
const permissions = shield({
    Query: {
        getDefenseProfiles:  or (isStaf,isAdmin),
    },
    Mutation: {
        deleteDefenseProfile:  isOwner,
        deleteRisk: isOwner,
    },
})

module.exports = {
    permissions
};