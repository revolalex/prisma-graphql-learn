const { rule } = require('graphql-shield');

const isAdmin = rule()(async (parent, args, context, info) => {
    const userData = context.prisma.user.findUnique({ where: { id: context.userId } })
    let userIsAdmin
    await userData.then(user => {
        console.log(user.role)
        user.role === "ADMIN" ? userIsAdmin = true : userIsAdmin = false
    })
    return userIsAdmin
})

const isStaf = rule()(async (parent, args, context, info) => {
    const userData = context.prisma.user.findUnique({ where: { id: context.userId } })
    let userRoleIsStaf
    await userData.then(user => {
        console.log(user.role)
        user.role === "STAFF" ? userRoleIsStaf = true : userRoleIsStaf = false
    })
    return userRoleIsStaf
})

const isViewer = rule()(async (parent, args, context, info) => {
    const userData = context.prisma.user.findUnique({ where: { id: context.userId } })
    let userRoleIsViewer
    await userData.then(user => {
        console.log(user.role)
        user.role === "VIEWER" ? userRoleIsViewer = true : userRoleIsViewer = false
    })
    return userRoleIsViewer
})

module.exports = {
    isAdmin,
    isStaf,
    isViewer
};

