function links(parent, args, context) {
  return context.prisma.link.findMany()
}

function getUser(parent, args, context) {
  return context.prisma.user.findMany()
}

module.exports = {
  links,
  getUser
}