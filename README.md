# omg-js-testrunner
Simple node service to run test jobs. The job can specify an npm script to run. 
Stores the results of the last 5 jobs in memory.

# API

## Run a test job
POST http://localhost:3333/job
```
{
	"job": {
		"id": "a6ff00e9feb18400551fef6c3e5900df",
		"script": "integration-test"
	}
}
```
If no `id` is passed it will generate one.
Returns the job id e.g. `a6ff00e9feb18400551fef6c3e5900df`


## Get the status of a test job
GET http://localhost:3333/job/:id/status

Returns one of:
- `Starting`
- `Failed to start: error`
- `Started`
- `Exited`


## Check if the test job succeeded
GET http://localhost:3333/job/:id/success

Returns `true` if the tests passed (i.e. exited with code 0), `false` otherwise.


## Get the job's output
GET http://localhost:3333/job/:id/output

Returns both stdout and stderr
```
{
    "stdout": "omg-js@0.1.0 integration-test...",
    "stderr": "npm ERR! ..."
}
```
