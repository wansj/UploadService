"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = "\n    scalar Upload\n    enum Tags{\n      BOOK\n      USER\n    }\n    type File {\n      id: ID!\n      file: Upload\n    }\n    type Query {\n      fileByID(id: ID!): File\n      covers(page: Int!, size: Int!, query: String!): [File!]\n      coversTotal(query: String): Int\n    }\n    type Mutation {\n      singleUpload (file: Upload!, tag: Tags!): File!\n      multiUpload (files: [Upload!]!, tag: Tags!): [File!]!\n      delFileByID(id: ID!): File\n      renameFileByID(id: ID!, filename: String!): File\n      delFiles(query: String!): Boolean!\n    }\n  ";
//# sourceMappingURL=schema.js.map