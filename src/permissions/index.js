const {  shield, rule, and, or  } = require('graphql-shield');
const { isAdmin, isStaf, isOwner, isViewer } = require('./rules');
// and - allows access only if all sub rules used return true,
// or - resolves to true if at least one rule passes,

// list the permissions for all queries and mutations
const permissions = shield({
    Query: {
        getDefenseProfiles:  or (isStaf, isAdmin, isViewer),
    },
    Mutation: {
        // only owner of the object can delete it
        deleteDefenseProfile:  isOwner,
        deleteRisk: isOwner,
        // VIEWER can't
        postRisk: and (isStaf, isAdmin),
        postDefenseProfile: and (isStaf, isAdmin),
    },
})

module.exports = {
    permissions
};