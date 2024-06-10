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

interface UserRecord {
  name: string
  bio: string
}

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

app.use(express.json())

app.get('/', (req, res) => {
  console.log(`Received request ${req.body}`)
  res.send(JSON.stringify('Hello Backend!'))
})

app.post('/api/form-handler/set', async (req, res) => {
  console.log(`Received request ${req.body}`)
  const person_name = req.body.person_name
  const person_bio = req.body.person_bio
  let response: string
  if (
    person_name &&
    person_bio &&
    typeof person_name === 'string' &&
    typeof person_bio === 'string'
  ) {
    console.log(`Received user form submission: Name:${person_name} Bio:${person_bio}`)
    response = await replace_user(person_name, person_bio)
  } else {
    response = 'User not updated, Name or Bio missing'
  }
  console.log(`Response to client: ${response}`)
  res.send(JSON.stringify(response))
})

app.post('/api/form-handler/get', async (req, res) => {
  console.log(`Received request ${req.body}`)
  const person_name = req.body.person_name
  let response: UserRecord | string
  if (person_name) {
    console.log(`Getting user ${person_name}`)
    response = await get_user(person_name)
  } else {
    response = 'Name missing from bio get request'
  }
  res.send(JSON.stringify(response))
})

app.listen(port, () => {
  console.log(`Example backend app listening on port ${port}`)
})

async function replace_user(name: string, bio: string): Promise<string> {
  try {
    await mongodb_client.connect()
    const db = mongodb_client.db(database_name)
    const user_bios_collection = db.collection<UserRecord>('user_bios')
    const user_record: UserRecord = {
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

async function get_user(name: string): Promise<UserRecord> {
  try {
    await mongodb_client.connect()
    const db = mongodb_client.db(database_name)
    const user_bios_collection = db.collection<UserRecord>('user_bios')
    const query = { name: name }
    const user_document = await user_bios_collection.findOne(query, {
      projection: { _id: 0, name: 1, bio: 1 },
    })
    console.log(`Retrieved document ${user_document}`)
    return user_document
  } finally {
    await mongodb_client.close()
  }
}
