const { rule } = require('graphql-shield');

const isAdmin = rule()(async (parent, args, context, info) => {
    const userData = context.prisma.user.findUnique({ where: { id: context.userId } })
    let userIsAdmin
    await userData.then(user => {
       user.role === "ADMIN" ? userIsAdmin = true : userIsAdmin = false
    })
    return userIsAdmin
})

module.exports = {
    isAdmin,
};

