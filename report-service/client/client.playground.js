const {AssertionError} = require('chai')
const moment = require('moment')
const {ReportServiceClient} = require('./index')
const client = new ReportServiceClient('http://localhost:3000')

const getNumber = (n = 1000, from = 0) => Math.floor((Math.random() * (n - from) + from))

const getRandomTimeName = () => ['hours', 'days'][getNumber(2)]
const getProject = () => ['project 1', 'project 2', 'project 3', 'project 4'][getNumber(4)]

const generateEnv = () => `feature-TICKET-${getNumber(100)}`
const getDate = () => +moment().subtract(getNumber(3), getRandomTimeName())

const cases = Array(3000).fill('_').map(() => ({
  id: `TEST_CASE_ID-${getNumber(100)}`,
  stackTrace: new AssertionError(`
    EXPECTATION NUMBER :${getNumber(10)},
    expect ${getNumber(30)} to not eql ${getNumber(100)}
  `).toString(),
  env: generateEnv(),
  date: getDate(),
  project: getProject(),
  run: getNumber(100)
}))


const runs = cases
  .map((testCase) => testCase.run)
  .filter((item, index, arr) => arr.indexOf(item) === index)
  .map((item) => ({
    run: item,
    count: getNumber(500, 150),
    runStatus: getNumber(0, 2),
    project: getProject(),
  }))



const config = {
  isSuccess: 0,
  failedReasons: [
    'EXPECTATION NUMBER :6',
    'EXPECTATION NUMBER :0',
    'EXPECTATION NUMBER :1',
    'EXPECTATION NUMBER :9',
    'EXPECTATION NUMBER :4',
    'EXPECTATION NUMBER :2',
    'EXPECTATION NUMBER :4',
    'EXPECTATION NUMBER :9',
    'EXPECTATION NUMBER :6',
    'EXPECTATION NUMBER :2'
  ]
}

client.setReportConfig({config})

addTestCases()
async function addTestCases() {
  for(const testCase of cases) {
    await client.addNewCase({data: testCase})
  }
}

addRuns()
async function addRuns() {
  /* eslint-disable */
  const [re1, re2, ...runst] = runs
  for(const run of runst) {
    await client.addRunStatistics({data: run})
  }
}
