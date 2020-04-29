const express = require('express')
const bodyParser = require('body-parser')
const runner = require('./testRunner')
const crypto = require('crypto')
require('log-timestamp')

const port = process.env.TESTRUNNER_PORT || 3333
const cwd = process.env.TESTRUNNER_OMGJS_DIR || '/home/omg/omg-js'

const app = express()
app.use(bodyParser.json())

app.post('/job', (req, res) => {
  const job = req.body.job

  job.id = job.id || randomId()
  job.command = 'npm'
  job.args = ['run', job.script]
  job.cwd = cwd
  console.log(`starting new job: ${JSON.stringify(job)}`)
  runner.start(job)
  res.send(job.id)
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
