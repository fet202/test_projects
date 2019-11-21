const {getTestCases, addTestCase} = require('./test.cases')
const {setReporterConfig, getReporterConfig} = require('./configs')
const {getStaticHtml, getStaticScripts} = require('./static')
const {addRunsStatistics, getRunsStatistics} = require('./run.statistics')
const {dropCurrentStatistics} = require('./common')

module.exports = {
  addTestCase,
  getTestCases,

  setReporterConfig,
  getReporterConfig,

  getStaticScripts,
  getStaticHtml,

  addRunsStatistics,
  getRunsStatistics,

  dropCurrentStatistics
}
