'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fileSchema = _mongoose2.default.Schema({
  filename: { type: String, required: true },
  mimetype: { type: String, required: true },
  stream: { type: String, required: true },
  encoding: { type: String, required: true },
  tag: { type: String, required: true // 图片所属的应用范围，如图书封面为Book，用户头像为User
  } });
var File = null;
try {
  File = _mongoose2.default.model('File', fileSchema);
} catch (e) {
  if (e.name === 'OverwriteModelError') {
    File = _mongoose2.default.model('File');
  }
}
exports.default = File;
//# sourceMappingURL=file.js.map