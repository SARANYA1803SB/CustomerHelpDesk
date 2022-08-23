const oas = require('fastify-oas');

const cors = require('fastify-cors');

const { customErrorHandler } = require('@store-service/error-handler');

const { swagger_options } = require('../config/swagger');

const routes = require('../routes')

function create(core) {

  const fastify = core.createServer({
  });
  fastify.register(customErrorHandler());
  fastify.register(oas, swagger_options)
  fastify.register(cors);
  fastify.register(routes , { prefix : '/v1/'});
  return fastify;

}


module.exports = {
  create
}


