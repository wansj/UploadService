'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _graphqlTag = require('graphql-tag');

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } // import { GraphQLUpload } from 'apollo-upload-server'


var iconv = require('iconv-lite');
var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');

exports.default = {
  Upload: new _graphql.GraphQLScalarType({
    name: 'Upload',
    description: 'The `Upload` scalar type represents a file upload promise that resolves ' + 'an object containing `stream`, `filename`, `mimetype` and `encoding`.',
    // value from the client
    parseValue: function parseValue(value) {
      return value;
    },

    // ast value is always in string format
    parseLiteral: function parseLiteral(ast) {
      throw new Error('Upload scalar literal unsupported');
    },

    // value sent to the client
    serialize: function serialize(value) {
      return value;
      // return JSON.stringify(value)
    }
  }),
  File: {
    id: function id(obj, args, context) {
      // console.log(obj)
      return obj._id;
    },
    file: function file(obj, args, context) {
      var _id = obj._id,
          rest = _objectWithoutProperties(obj, ['_id']);

      return rest;
    }
  },
  Query: {
    fileByID: function fileByID(obj, _ref, context, info) {
      var id = _ref.id;

      var File = context.db.model('File');
      return File.findById(id).lean().exec();
    },
    covers: function covers(obj, _ref2, context, info) {
      var page = _ref2.page,
          size = _ref2.size,
          query = _ref2.query;

      var File = context.db.model('File');
      var q = JSON.parse(query);
      // console.log(q)
      return File.find(q).skip(page * size).limit(size).lean().exec();
    },
    coversTotal: function coversTotal(obj, _ref3, context, info) {
      var query = _ref3.query;

      var File = context.db.model('File');
      var q = typeof query === 'string' ? JSON.parse(query) : {};
      return File.count(q).exec();
    }
  },
  Mutation: {
    multiUpload: function multiUpload(obj, _ref4, context, info) {
      var files = _ref4.files,
          tag = _ref4.tag;

      // console.log(files)
      var File = context.db.model('File');
      return File.insertMany(files.map(function (file) {
        return Object.assign({}, file, { tag: tag });
      }), { ordered: false });
    },
    singleUpload: function singleUpload(obj, _ref5, context, info) {
      var file = _ref5.file,
          tag = _ref5.tag;

      var File = context.db.model('File');
      return new File(Object.assign({}, file, { tag: tag })).save();
    },
    delFileByID: function delFileByID(obj, _ref6, context, info) {
      var id = _ref6.id;

      var File = context.db.model('File');
      return File.findByIdAndRemove(id).lean().exec();
    },
    delFiles: function delFiles(obj, _ref7, context, info) {
      var query = _ref7.query;

      var File = context.db.model('File');
      return new Promise(function (resolve, reject) {
        File.deleteMany(JSON.parse(query), function (err, result) {
          if (err) reject(err);else resolve(true);
        });
      });
    },
    renameFileByID: function renameFileByID(obj, _ref8, context, info) {
      var id = _ref8.id,
          filename = _ref8.filename;

      var File = context.db.model('File');
      return File.findByIdAndUpdate(id, { filename: filename }, { new: true }).lean().exec();
    }
  }
};
//# sourceMappingURL=resolvers.js.map