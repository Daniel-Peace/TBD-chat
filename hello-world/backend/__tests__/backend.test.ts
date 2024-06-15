import { expect, it, describe, mock } from 'bun:test'

import { replace_user } from '../src/database_helper.ts'

const CollectionMock = {
  replaceOne: () => {
    return {
      modifiedCount: 0,
    }
  },
}
const DbMock = {
  collection: () => CollectionMock,
}
// we cast the mock as "any" to suppress errors of passing it into the MongoClient parameter
const MongoClientMock = {
  connect: () => Promise<null>,
  close: () => Promise<null>,
  db: () => {
    return DbMock
  },
} as any

mock.module('../src/database_helper.ts', () => {
  return {
    mongodb_client: () => MongoClientMock,
  }
})

describe('The database helper module', () => {
  it('Will not replace a user with no bio', async () => {
    const error_response = await replace_user('Skyler', '', MongoClientMock)
    expect(error_response).toBe('Name or bio missing')
  })

  it(`Will inform the caller when a new user is added`, async () => {
    const new_user_response = await replace_user('NewGuy', "I'm nice", MongoClientMock)
    expect(new_user_response).toBe('New user added')
  })
})
