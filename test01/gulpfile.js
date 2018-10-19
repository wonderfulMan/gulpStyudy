
const { createDir, outDir, createFile } = require('./config/pathname')
const fs = require('fs')
const utils = require('./utils')
const gulp = require('gulp')
const browserSync = require('browser-sync').create()


// 创建目录
gulp.task('create-dirs', () => {
  const mkdirs = require('mkdirp')
  for (let i in createDir) {
    mkdirs(createDir[i], (error) => error ? console.log(error) : console.log(`create ---- ${createDir[i]}`))
  }
})

// 创建文件
gulp.task('create-files', () => {
  for (let i in createFile) {
    fs.writeFile(createFile[i], '', (err) => {
      if (err) throw new Error(err)
      console.log(`create ---- ${createFile[i]}`)
    })
  }
})

// 编译scss
gulp.task('compile-scss', () => {

  const sass = require('gulp-sass')
  const notify = require('gulp-notify')
  const plumber = require('gulp-plumber')
  const scssFileEntry = './src/assets/scss'
  const allScssFile = utils.readFolderFileName(scssFileEntry)

  allScssFile.forEach(fileName => {
    return gulp.src(`${createDirs.scss}/${fileName}`)
      .pipe(plumber({
        errorHandler: notify.onError('Error: <%= error.message %>')
      }))
      .pipe(sass())
      .pipe(gulp.dest(`${outDir.dest}/css`))
      .pipe(browserSync.reload({ stream: true }))
  })

})

// 启动本地服务 监听文件
gulp.task('server', ['compile-scss'], () => {
  browserSync.init({ server: './' })
  gulp.watch(`${createDirs.scss}/*.scss`, ['compile-scss'])
  gulp.watch('./')
})