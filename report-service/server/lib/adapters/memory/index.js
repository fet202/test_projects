const path = require('path')
const {getConfig, setConfig} = require('../config')
const {getFreeBackUpFilePathName, getFilesWithSubDirs} = require('./storage.restore')
const {readFile, tryParseJson} = require('../../utils')

const storage = []

tryToRestoreStorageFromBackups()
async function tryToRestoreStorageFromBackups() {

  const {
    BACKUP_PATH = path.resolve(__dirname, '../../../temp'),
    BACKUP_FILES_PATTERN = 'backup.json'
  } = process.env

  const backUpFileName = await getFilesWithSubDirs(BACKUP_PATH, BACKUP_FILES_PATTERN)

  if(backUpFileName.length) {
    const lastTwoBackups = backUpFileName.slice(backUpFileName.length - 2, backUpFileName.length)
    for(const file of lastTwoBackups) {
      const backUpFileData = tryParseJson(await readFile(file))
      if(Array.isArray(backUpFileData)) {
        storage.push(...backUpFileData)
      }
    }
  }
}

/**
 * @example description
 * this interval is using for storing cases from memory
 * to storage backuk, for inMemory approach it is JSON files
 * in pre-defined directory, by default is /temp in root of the project
 *
 */
setInterval(async function() {
  // if cases more than 3500 - remove first 1000 and store them in file
  if(storage.length >= 3500) {
    const {BACKUP_PATH} = process.env
    const backUpFileName = await getFreeBackUpFilePathName(BACKUP_PATH)
    const storagePart = storage.splice(0, 1000)
    await require('fs').writeFile(backUpFileName, JSON.stringify(storagePart), function(err) {
      if(err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }
    })
  }
}, 1500)

/**
 *
 * @param {object<{id: string, date: string, build: string, stack: string|object}>} item
 * @returns undefined
 * @example item
 * {
 *  id: 'Test case 1',
 *  date: 1569677669693,
 *  build: 'Some build description',
 *  stack: 'Some stack trace'
 * }
 */
function setToStorage(item) {
  storage.push(item)
}

/**
 * @returns {array} storage
 * @example storage
 * [
 *   {
 *    id: 'Test case 1',
 *    date: 1569677669693,
 *    build: 'Some build description',
 *    stack: 'Some stack trace'
 *   }
 * ]
 */
function getStorageData(offset = 0, limit = storage.length) {
  return [...storage].slice(offset, limit)
}

/**
 * @returns countObject
 * @example countObject
 * {
 *  count: 1
 * }
 */
function getStorageDataCount() {
  return {count: storage.length}
}

module.exports = {
  getStorageData,
  setToStorage,
  getStorageDataCount,
  getConfig,
  setConfig
}
