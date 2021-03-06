// LINKS
function links(parent, args, context) {
  return context.prisma.link.findMany()
}
// USER
function getUsers(parent, args, context) {
  return context.prisma.user.findMany()
}
function getUser(parent, args, context) {
  return context.prisma.user.findUnique({ where: { id: +args.id } })
}

// RISK
function getRisks(parent, args, context) {
  return context.prisma.risk.findMany()
}
function getRisk(parent, args, context) {
  return context.prisma.risk.findUnique({ where: { id: +args.id } })
}
// DEFENSE PROFILE
function getDefenseProfile(parent, args, context) {
  return context.prisma.defenseProfile.findUnique({ where: { id: +args.id } })
}
function getDefenseProfiles(parent, args, context) {
  return context.prisma.defenseProfile.findMany()
}

module.exports = {
  links,
  getUsers,
  getUser,
  getRisks,
  getRisk,
  getDefenseProfile,
  getDefenseProfiles
}