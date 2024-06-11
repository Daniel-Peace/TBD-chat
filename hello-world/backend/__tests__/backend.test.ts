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
const MongoClientMock = {
  connect: () => {
    return undefined
  },
  db: () => {
    return DbMock
  },
}

mock.module('mongodb', () => {
  return {
    MongoClient: () => MongoClientMock,
  }
})

describe('The database helper module', () => {
  it('Will not replace a user with no bio', async () => {
    const error_response = await replace_user('Skyler', '')
    expect(error_response).toBe('Name or bio missing')
  })

  it(`Will inform the caller when a new user is added`, async () => {
    const new_user_response = await replace_user('NewGuy', "I'm nice")
    expect(new_user_response).toBe('New user added')
  })
})
