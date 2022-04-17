const { rule } = require('graphql-shield');

const isAdmin = rule()(async (parent, args, context, info) => {
    const userData = context.prisma.user.findUnique({ where: { id: context.userId } })
    let userIsAdmin
    await userData.then(user => {
        user.role === "ADMIN" ? userIsAdmin = true : userIsAdmin = false
    })
    return userIsAdmin
})

const isStaf = rule()(async (parent, args, context, info) => {
    const userData = context.prisma.user.findUnique({ where: { id: context.userId } })
    let userRoleIsStaf
    await userData.then(user => {
        user.role === "STAFF" ? userRoleIsStaf = true : userRoleIsStaf = false
    })
    return userRoleIsStaf
})

const isViewer = rule()(async (parent, args, context, info) => {
    const userData = context.prisma.user.findUnique({ where: { id: context.userId } })
    let userRoleIsViewer
    await userData.then(user => {
        user.role === "VIEWER" ? userRoleIsViewer = true : userRoleIsViewer = false
    })
    return userRoleIsViewer
})

const isOwner = rule()(async (parent, args, context, info) => {
    // delete risk
    if (context.body.operationName === "deleteRisk") {
        const riskDataQ = context.prisma.risk.findUnique({ where: { id: +args.id } })
        const risk = await riskDataQ
        if (risk.postedById === context.userId) {
            return true
        } else {
            return false
        }
    // delete defense profile    
    } else if(context.body.operationName === "deleteDefenseProfile") {
        const defenseProfileDataQ = context.prisma.defenseProfile.findUnique({ where: { id: +args.id } })
        const defenseProfile = await defenseProfileDataQ
        if (defenseProfile.postedById === context.userId) {
            return true
        } else {
            return false
        }
    }
    return false

})

module.exports = {
    isAdmin,
    isStaf,
    isViewer,
    isOwner
};

