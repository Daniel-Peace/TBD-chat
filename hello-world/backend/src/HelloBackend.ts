import express from 'express'
const app = express()
const port = 3001

app.get('/', (req, res) => {
  res.send('Hello Backend!')
})

app.listen(port, () => {
  console.log(`Example backend app listening on port ${port}`)
})
