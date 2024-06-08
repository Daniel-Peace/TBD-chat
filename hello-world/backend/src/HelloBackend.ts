import express from 'express'
import { MongoClient, ServerApiVersion } from 'mongodb'
const app = express()
const port = 3500

const mongodb_ip = '127.0.0.1'
const mongodb_port = '27017'
const uri = `mongodb://${mongodb_ip}:${mongodb_port}`
const database_name = 'hello_database'

const mongodb_client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function ping_database() {
  try {
    await mongodb_client.connect()
    const db = mongodb_client.db(database_name)
    await db.command({ ping: 1 })
    console.log("Pinged your deployment. You've successfully connected to MongoDB!")
  } finally {
    await mongodb_client.close()
  }
}
ping_database().catch(console.dir)

async function replace_user(name: String, bio: String): Promise<String> {
  try {
    await mongodb_client.connect()
    const db = mongodb_client.db(database_name)
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
  } finally {
    await mongodb_client.close()
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
  let response: String
  if (person_name && person_bio) {
    console.log(`Received user form submission: Name:${person_name} Bio:${person_bio}`)
    response = await replace_user(person_name, person_bio)
  } else {
    response = 'User not updated, Name or Bio missing'
  }
  res.send(response)
})

app.listen(port, () => {
  console.log(`Example backend app listening on port ${port}`)
})
