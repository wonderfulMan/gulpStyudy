// 读取指定路径下文件名

const fs = require('fs')
module.exports = {
  readFolderFileName: (path) => {
    const fileNames = fs.readdirSync(path)
    const result = []
    fileNames.forEach(item => {
      if (/\.scss$/.test(item)) {
        result.push(item)
      }
    })
    return result
  }
}