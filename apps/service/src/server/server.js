const { customErrorHandler } = require('@store-service/error-handler');
const core = require('@falabella-gitlab/fastify-core');

function createServerForTestCase(routes) {
    const fastify = core.createServer({});
    fastify.register(customErrorHandler());
    fastify.register(routes, { prefix: '/v1/' });
    return fastify;
}

module.exports = {
    createServerForTestCase
}