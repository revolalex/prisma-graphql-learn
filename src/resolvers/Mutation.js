const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10)
  const user = await context.prisma.user.create({ data: { ...args, password } })
  const token = jwt.sign({ userId: user.id }, APP_SECRET)
  return {
    token,
    user,
  }
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user.findUnique({ where: { email: args.email } })
  if (!user) {
    throw new Error('No such user found')
  }
  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }
  const token = jwt.sign({ userId: user.id }, APP_SECRET)
  return {
    token,
    user,
  }
}
async function postLink(parent, args, context, info) {
  const { userId } = context;

  return await context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    }
  })
}
async function editLink(parent, args, context, info) {
  const linkId =+args.id
  const newData ={
    id: linkId,
    url: args.url,
    description: args.description,
  }
  return await context.prisma.link.update({
    where: {id: linkId},
    data: newData,
  })
}

async function deleteLink(parent, args, context) {
  const idToDeleted = +args.id
  return await context.prisma.link.delete({
    where: { id: idToDeleted }
  })
}
async function deleteRisk(parent, args, context) {
  const idToDeleted = +args.id
  return await context.prisma.risk.delete({
    where: { id: idToDeleted }
  })
}
async function postRisk(parent, args, context, info) {
  const { userId } = context;

  return await context.prisma.risk.create({
    data: {
      name: args.name,
      value: +args.value,
      postedBy: { connect: { id: userId } },
    }
  })
}
async function editRisk(parent, args, context, info) {
  const riskId = +args.id
  const newValue = +args.value
  const newData = {
    name: args.name,
    value: newValue,
  }
  return await context.prisma.risk.update({
    where: { id: riskId },
    data: newData,
  })
}

module.exports = {
  // user
  signup,
  login,
  // link
  postLink,
  deleteLink,
  editLink,
  // risk
  postRisk,
  editRisk,
  deleteRisk
}