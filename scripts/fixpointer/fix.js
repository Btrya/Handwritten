const {
  fs,
  TemplateDir,
  SrcDir,
  RewriteTarget,
  readJSONFile,
  changeNextPointer
} = require('../utils')

function getAllFiles() {
  const files = fs.readdirSync(SrcDir, { encoding: 'utf-8' })
  return files
}

async function checkFiles(files) {
  const sorted = files.map(item => item.split('.')[0]).sort((a, b) => a - b)
  if (isConsecutiveArray(sorted)) {
    console.log('No need to fix pointer')
  } else {
    const point = findNextPointer(sorted)
    console.log(`Find your pointer must be ${point}`)
    await readJSONFile()
    await changeNextPointer(point)
    console.log(`Change Success.`)
  }
}

/**
 * 是否是连续数组 且从 1 开始
 */
function isConsecutiveArray(arr = []) {
  const n = arr.length
  return arr[0] === 1 && n === arr[n - 1]
}

function findNextPointer(arr) {
  const n = arr.length
  for (let i = 0; i < arr.length; ++i) {
    if (Number(arr[i]) !== i + 1) return i + 1
  }
  return n + 1
}

module.exports = () => {
  return new Promise((resolve, reject) => {
    const files = getAllFiles()
    checkFiles(files)
    resolve()
  })
}