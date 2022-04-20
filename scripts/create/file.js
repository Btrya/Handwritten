const {
  fs,
  TemplateDir,
  SrcDir,
  ReWriteReg,
  TemplateFiles,
  readJSONFile,
  changeNextPointer
} = require('../utils')

/**
 * 获取当前Pointer
 */
async function getPointer() {
  const obj = await readJSONFile()
  return obj.nextPointer
}

async function getFileName(fileName) {
  const pointer = await getPointer()
  return `/${pointer}.${fileName}`
}


/**
 * 复制模板到 src 目录
 */
// TODO: add configuration
// TOFIX: use async await
async function copyTmeplate(fileName) {
  return new Promise(async (resolve, reject) => {
    const targetDir = SrcDir + await getFileName(fileName)
    fs.ensureDir(targetDir)
      .then(() => {
        console.log('create template dir success...')
        fs.copy(TemplateDir, targetDir)
          .then(() => {
            console.log('copy template files success...')
            resolve(targetDir)
          })
          .catch(err => reject(err))
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 重写对应模板文件
 */
async function rewriteTemplate(target, funcName) {
  for (let file of TemplateFiles) {
    const fileJSON = await read(target + file, funcName)
    await save(target + file, fileJSON)
  }
}

async function read(target, funcName) {
  let readerJson = await fs.readFile(target, { encoding: 'utf-8' })
  readerJson = readerJson.replace(ReWriteReg, funcName)
  return readerJson
}

async function save(target, json) {
  await fs.writeFile(target, json, { encoding: 'utf-8' })
}

module.exports = ({ fileName, funcName }) => {
  return new Promise(async (resolve, reject) => {
    const targetDir = await copyTmeplate(fileName)
    await rewriteTemplate(targetDir, funcName)
    console.log(`generate ${fileName} success`)
    await changeNextPointer()
    resolve('generate template success')
  })
}