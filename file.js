import mongoose from 'mongoose'

const fileSchema = mongoose.Schema({
  filename: { type: String, required: true },
  mimetype: { type: String, required: true },
  stream: { type: String, required: true },
  encoding: { type: String, required: true },
  tag: { type: String, required: true } // 图片所属的应用范围，如图书封面为Book，用户头像为User
})
let File = null
try {
  File = mongoose.model('File', fileSchema)
} catch (e) {
  if (e.name === 'OverwriteModelError') {
    File = mongoose.model('File')
  }
}
export default File
