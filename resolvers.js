// import { GraphQLUpload } from 'apollo-upload-server'
import { GraphQLScalarType } from 'graphql'
import gql from 'graphql-tag'
const iconv = require('iconv-lite')
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')


export default {
  Upload: new GraphQLScalarType({
    name: 'Upload',
    description:
    'The `Upload` scalar type represents a file upload promise that resolves ' +
    'an object containing `stream`, `filename`, `mimetype` and `encoding`.',
    // value from the client
    parseValue(value) {
      return value
    },
    // ast value is always in string format
    parseLiteral(ast) {
      throw new Error('Upload scalar literal unsupported')
    },
    // value sent to the client
    serialize(value) {
      return value
      // return JSON.stringify(value)
    }
  }),
  File: {
    id (obj, args, context) {
      // console.log(obj)
      return obj._id
    },
    file (obj, args, context) {
      const { _id, ...rest } = obj
      return rest
    }
  },
  Query: {
    fileByID (obj, { id }, context, info) {
      const File = context.db.model('File')
      return File.findById(id).lean().exec()
    },
    covers (obj, { page, size, query }, context, info){
      const File = context.db.model('File')
      let q = JSON.parse(query)
      // console.log(q)
      return File.find(q).skip(page * size).limit(size).lean().exec()
    },
    coversTotal (obj, {query}, context, info) {
      const File = context.db.model('File')
      const q = typeof query === 'string' ? JSON.parse(query) : {}
      return File.count(q).exec()
    }
  },
  Mutation: {
    multiUpload (obj, { files, tag }, context, info) {
      // console.log(files)
      const File = context.db.model('File')
      return File.insertMany(files.map(file => Object.assign({}, file, {tag})), {ordered: false})
    },
    singleUpload (obj, { file, tag }, context, info) {
      const File = context.db.model('File')
      return new File(Object.assign({}, file, {tag})).save()
    },
    delFileByID (obj, { id }, context, info) {
      const File = context.db.model('File')
      return File.findByIdAndRemove(id).lean().exec()
    },
    delFiles (obj, {query}, context, info) {
      const File = context.db.model('File')
      return new Promise((resolve, reject) => {
        File.deleteMany(JSON.parse(query), function (err, result) {
          if (err) reject(err)
          else resolve(true)
        })
      })
    },
    renameFileByID (obj, { id, filename }, context, info) {
      const File = context.db.model('File')
      return File.findByIdAndUpdate(id, { filename }, { new: true }).lean().exec()
    }
  }
}
