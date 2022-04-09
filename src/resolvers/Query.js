function links(parent, args, context) {
  return context.prisma.link.findMany()
}
function getUser(parent, args, context) {
  return context.prisma.user.findMany()
}
function getRisk(parent, args, context) {
  return context.prisma.risk.findMany()
}
function getRiskById(parent, args, context) {
  return context.prisma.risk.findUnique({ where: { id: +args.id } })
}

module.exports = {
  links,
  getUser,
  getRisk,
  getRiskById
}