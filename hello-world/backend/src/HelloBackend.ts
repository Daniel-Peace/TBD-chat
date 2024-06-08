import express from 'express'
import { MongoClient, ServerApiVersion } from 'mongodb'
const app = express()
const port = 3500

const mongodb_ip = '127.0.0.1'
const mongodb_port = '27017'
const uri = `mongodb://${mongodb_ip}:${mongodb_port}`

const mongodb_client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function run() {
  try {
    await mongodb_client.connect()

    // Send a ping to confirm a successful connection
    const db = mongodb_client.db('hello_database')
    await db.command({ ping: 1 })
    console.log("Pinged your deployment. You've successfully connected to MongoDB!")
  } finally {
    await mongodb_client.close()
  }
}
run().catch(console.dir)

async function replace_user(name: string, bio: string): Promise<string> {
  try {
    await mongodb_client.connect()
    const db = mongodb_client.db('hello_database')
    const user_bios_collection = db.collection('user_bios')
    const user_record = {
      name: name,
      bio: bio,
    }
    const query = { name: name }
    const result = await user_bios_collection.replaceOne(query, user_record, {
      upsert: true,
    })
    console.log(`Modified ${result.modifiedCount} document(s)`)
    if (result.modifiedCount == 0) {
      return 'New user added'
    } else {
      return 'User bio updated'
    }
  } catch (error) {
    const error_message = `Could not replace user: ${error}`
    console.error(error_message)
    return error_message
  }
}

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.get('/', (req, res) => {
  res.send('Hello Backend!')
})

app.post('/api/form-handler', async (req, res) => {
  const person_name = req.body.person_name
  const person_bio = req.body.person_bio
  console.log(`Received user form submission: Name:${person_name} Bio:${person_bio}`)
  const response = await replace_user(person_name, person_bio).catch(console.dir)
  res.send(response)
})

app.listen(port, () => {
  console.log(`Example backend app listening on port ${port}`)
})
