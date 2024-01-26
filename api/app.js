const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const { index, create } = require('./src/controllers/entry')
const { validateEntry } = require('./src/middleware/validateEntry')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app
  .route('/api/entries')
  .get((req, res) => index(req, res))
  .post(validateEntry, (req, res) => create(req, res))

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})
