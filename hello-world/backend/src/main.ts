import express from 'express'
import { ping_database, UserRecord, replace_user, get_user } from './database_helper.ts'

const app = express()
const port = 3500

ping_database()

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