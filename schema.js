export default `
    scalar Upload
    enum Tags{
      BOOK
      USER
    }
    type File {
      id: ID!
      file: Upload
    }
    type Query {
      fileByID(id: ID!): File
      covers(page: Int!, size: Int!, query: String!): [File!]
      coversTotal(query: String): Int
    }
    type Mutation {
      singleUpload (file: Upload!, tag: Tags!): File!
      multiUpload (files: [Upload!]!, tag: Tags!): [File!]!
      delFileByID(id: ID!): File
      renameFileByID(id: ID!, filename: String!): File
      delFiles(query: String!): Boolean!
    }
  `