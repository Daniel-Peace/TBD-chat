import express from 'express'
const app = express()
const port = 3500

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.get('/', (req, res) => {
  res.send('Hello Backend!')
})

app.post('/api/form-handler', (req, res) => {
  const person_name = req.body.person_name
  const person_bio = req.body.person_bio
  console.log(`Received user form submission: Name:${person_name} Bio:${person_bio}`)
  res.send('Form submission to be implemented')
})

app.listen(port, () => {
  console.log(`Example backend app listening on port ${port}`)
})
