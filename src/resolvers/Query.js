function links(parent, args, context) {
  return context.prisma.link.findMany()
}
function deleteLink(parent, args, context) {
  const idDeleted= +args.id
  return context.prisma.link.delete({
    where: {
      id: idDeleted
    }
  })
}

function getUser(parent, args, context) {
  return context.prisma.user.findMany()
}

module.exports = {
  links,
  getUser
}