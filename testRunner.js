
const { spawn } = require('child_process')
const JobList = require('./fixedList')
require('log-timestamp')

const jobs = new JobList(5)

function start (jobdesc) {
  const job = {
    id: jobdesc.id,
    status: 'Starting',
    stdout: '',
    stderr: ''
  }
  jobs.add(job)

  const process = spawn(jobdesc.command, jobdesc.args, { cwd: jobdesc.cwd, env: jobdesc.env })
  job.status = 'Started'
  job.process = process
  process.stdout.on('data', (data) => {
    job.stdout += data
    console.log(`stdout: ${data}`)
  })

  process.stderr.on('data', (data) => {
    job.stderr += data
    console.error(`stderr: ${data}`)
  })

  process.on('exit', (code) => {
    job.code = code
    job.status = `Exited`
    console.log(`Exited: ${code}`)
  })

  process.on('error', (err) => {
    job.status = `Failed to start: ${err}`
    console.error(err)
  })
}

function find (id) {
  const job = jobs.find(id)
  if (!job) {
    throw new Error(`No job with id ${id}`)
  }
  return job
}

function status (id) {
  const job = find(id)
  return job.status
}

function success (id) {
  const job = find(id)
  return job.code === 0
}

function kill (id) {
  const job = find(id)
  job.process.kill()
}

function output (id) {
  const job = find(id)
  return { stdout: job.stdout, stderr: job.stderr }
}

module.exports = { start, find, kill, status, success, output }
