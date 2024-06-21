import { MongoClient, ServerApiVersion } from 'mongodb'
import util from 'util'

const mongodb_ip = '127.0.0.1'
const mongodb_port = '27017'
const uri = `mongodb://${mongodb_ip}:${mongodb_port}`
const database_name = 'hello_database_test'

export type UserRecord = {
  name: string
  bio: string
}

const new_mongodb_client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

export async function resetTestDatabase(mongodb_client = new_mongodb_client) {
  try {
    await mongodb_client.connect()
    const db = mongodb_client.db(database_name)
    await db.collection('user_bios').deleteMany({})
  } catch (error) {
    console.error('Error resetting test database:', error)
  } finally {
    await mongodb_client.close()
  }
}

export async function ping_database(mongodb_client = new_mongodb_client) {
  try {
    await mongodb_client.connect()
    const db = mongodb_client.db(database_name)
    await db.command({ ping: 1 })
    console.log("Pinged your deployment. You've successfully connected to MongoDB!")
  } catch (error) {
    console.log(error)
  } finally {
    await mongodb_client.close()
  }
}

export async function replace_user(
  name: string,
  bio: string,
  mongodb_client = new_mongodb_client,
): Promise<string> {
  if (!name || !bio) {
    return 'Name or bio missing'
  }
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

export async function get_user(
  name: string,
  mongodb_client = new_mongodb_client,
): Promise<UserRecord> {
  try {
    await mongodb_client.connect()
    const db = mongodb_client.db(database_name)
    const user_bios_collection = db.collection<UserRecord>('user_bios')
    const query = { name: name }
    const user_document = await user_bios_collection.findOne(query, {
      projection: { _id: 0, name: 1, bio: 1 },
    })
    console.log(`Retrieved document ${util.inspect(user_document)}`)
    return user_document
  } finally {
    await mongodb_client.close()
  }
}
