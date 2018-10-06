'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _microrouter = require('microrouter');

var _micro = require('micro');

var _apolloServerCore = require('apollo-server-core');

var _url = require('url');

var url = _interopRequireWildcard(_url);

var _apolloServerMicro = require('apollo-server-micro');

var _graphqlTools = require('graphql-tools');

require('regenerator-runtime/runtime');

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _file = require('./file');

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

var _resolvers = require('./resolvers');

var _resolvers2 = _interopRequireDefault(_resolvers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
// import cors from 'micro-cors'

// import { processRequest } from 'apollo-upload-server'

// import typeis from 'type-is'
//不导入这个包，就会报regeneratorRuntime未定义的错误


var schema = (0, _graphqlTools.makeExecutableSchema)({
  typeDefs: _schema2.default,
  resolvers: _resolvers2.default
});

var graphqlHandler = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _micro.json)(req, { limit: '1gb' });

          case 3:
            _context.next = 8;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context['catch'](0);
            throw _context.t0;

          case 8:
            return _context.abrupt('return', (0, _apolloServerMicro.microGraphql)({
              schema: schema,
              context: {
                db: _db2.default
              }
            })(req, res));

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 5]]);
  }));

  return function graphqlHandler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var graphiqlHandler = (0, _apolloServerMicro.microGraphiql)({
  endpointURL: '/graphqlFileUpload'
});

exports.default = (0, _microrouter.router)(
// options('/graphqlFileUpload', cors()),
(0, _microrouter.get)('/graphqlFileUpload', graphqlHandler), (0, _microrouter.post)('/graphqlFileUpload', graphqlHandler), (0, _microrouter.get)('/graphiql', graphiqlHandler), function (req, res) {
  return (0, _micro.send)(res, 404, 'not found');
});
//# sourceMappingURL=index.js.map