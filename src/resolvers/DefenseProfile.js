function postedBy(parent, args, context) {
    return context.prisma.defenseProfile.findUnique({ where: { id: parent.id } }).postedBy()
}

module.exports = {
    postedBy,
}