import express from 'express'
import { PrismaClient } from '@prisma/client'

const app = express()
const port = process.env.PORT || 80

app.get('/api', (req, res) => res.send('Hello World!'))

const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      posts: {
        create: { title: 'Hello World' },
      },
      profile: {
        create: { bio: 'I like turtles' },
      },
    },
  })

  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  })
  console.dir(allUsers, { depth: null })
}

main()
.catch((e) => {
  throw e
})
.finally(async () => {
  await prisma.$disconnect()
})

app.listen(port, () => console.log(`Server is running on port ${port}`))
