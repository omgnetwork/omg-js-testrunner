const express = require('express')
const bodyParser = require('body-parser')
const runner = require('./testRunner')
const crypto = require('crypto')

const port = process.env.TESTRUNNER_PORT || 3333

const ALLOWED_COMMANDS = ['npm']

const app = express()
app.use(bodyParser.json())

app.post('/job', (req, res) => {
  if (!ALLOWED_COMMANDS.includes(req.body.job.command)) {
    res.status(422)
    res.send(`Command ${req.body.job.command} is not allowed`)
    return
  }

  req.body.job.id = req.body.job.id || randomId()
  console.log(`starting new job: ${JSON.stringify(req.body.job)}`)
  runner.start(req.body.job)
  res.send(req.body.job.id)
})

app.get('/job/:id/status', (req, res) => {
  try {
    runner.find(req.params.id)
  } catch (err) {
    res.status(404)
    res.send(err.toString())
    return
  }

  res.send(runner.status(req.params.id))
})

app.get('/job/:id/success', (req, res) => {
  try {
    runner.find(req.params.id)
  } catch (err) {
    res.status(404)
    res.send(err.toString())
    return
  }

  res.send(runner.success(req.params.id))
})

app.get('/job/:id/output', (req, res) => {
  try {
    runner.find(req.params.id)
  } catch (err) {
    res.status(404)
    res.send(err.toString())
    return
  }

  res.send(runner.output(req.params.id))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

function randomId () {
  return crypto.randomBytes(16).toString('hex')
}
