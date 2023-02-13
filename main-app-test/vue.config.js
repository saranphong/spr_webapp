const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false
})
// เพิ่มส่วนด้านล่างนี้เพื่อตอน Build Project จะได้ใช้งานบน XAMPP ได้
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : './',
}