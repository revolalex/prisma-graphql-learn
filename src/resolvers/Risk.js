function postedBy(parent, args, context) {
    return context.prisma.risk.findUnique(
        { where: { id: parent.id } }
    ).postedBy()
}

module.exports = {
    postedBy,
}