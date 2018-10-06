'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.client = undefined;

var _apolloClient = require('apollo-client');

var _apolloLinkHttp = require('apollo-link-http');

var _apolloCacheInmemory = require('apollo-cache-inmemory');

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _settings = require('./settings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*使用ApolloClient来实现microservices之间的互相调用，client对象存储在context里，
在resolver中可以通过context.client.query|mutate来调用其他微服务（如UploadService）*/
var client = exports.client = new _apolloClient.ApolloClient({
  link: new _apolloLinkHttp.HttpLink({ uri: _settings.remoteSchemaUrl, fetch: _nodeFetch2.default }),
  cache: new _apolloCacheInmemory.InMemoryCache()
});
//# sourceMappingURL=ApolloClient.js.map