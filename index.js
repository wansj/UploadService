import { get, post, options, router } from 'microrouter'
import { send, json } from 'micro'
// import cors from 'micro-cors'
import { runHttpQuery } from 'apollo-server-core'
import * as url from 'url'
import { microGraphiql, microGraphql } from 'apollo-server-micro'
// import { processRequest } from 'apollo-upload-server'
import { makeExecutableSchema } from 'graphql-tools'
// import typeis from 'type-is'
//不导入这个包，就会报regeneratorRuntime未定义的错误
import "regenerator-runtime/runtime"
import db from './db'
import { File } from './file'
import typeDefs from './schema'
import resolvers from './resolvers'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const graphqlHandler = async (req, res) => {
  // 对于json只能处理1mb大小body的限制，可以利用json会缓存的特性（其内部又一个WeakMap,保存的是req=>parseBody）
  // 在microGraphql前面先调用一次json(req, {limit: '1gb'}),这样当microGraphql再调用json解析的时候就会直接从缓存中返回
  try {
    await json(req, {limit: '1gb'})
  } catch (e) {
    throw e
  }
  return microGraphql({
    schema,
    context: {
      db
    }
  })(req, res)
}
const graphiqlHandler = microGraphiql({
  endpointURL: '/graphqlFileUpload'
})

export default router(
  // options('/graphqlFileUpload', cors()),
  get('/graphqlFileUpload', graphqlHandler),
  post('/graphqlFileUpload', graphqlHandler),
  get('/graphiql', graphiqlHandler),
  (req, res) => send(res, 404, 'not found')
)
