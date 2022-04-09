function links(parent, args, context) {
  return context.prisma.user.findUnique({ where: { id: parent.id } }).links()
}
function risk(parent, args, context) {
  return context.prisma.user.findUnique({ where: { id: parent.id } }).risk()
}

module.exports = {
  links,
  risk
}