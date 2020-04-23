
const { spawn } = require('child_process')
const process = require('process');
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

  // Let jobdesc.env vars override any in vars the default env
  const jobEnv = {...process.env};
  Object.assign(jobEnv, jobdesc.env);

  const childProcess = spawn(jobdesc.command, jobdesc.args, { cwd: jobdesc.cwd, env: jobEnv })
  job.status = 'Started'
  job.process = childProcess
  childProcess.stdout.on('data', (data) => {
    job.stdout += data
    console.log(`stdout: ${data}`)
  })

  childProcess.stderr.on('data', (data) => {
    job.stderr += data
    console.error(`stderr: ${data}`)
  })

  childProcess.on('exit', (code) => {
    job.code = code
    job.status = `Exited`
    console.log(`Exited: ${code}`)
  })

  childProcess.on('error', (err) => {
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
