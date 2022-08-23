const { fastifyRequestContextPlugin } = require('@fastify/request-context')
const dotenv = require('./config/environment')();

const core = require('@falabella-gitlab/fastify-core');

const fastifyCoreToken = require("@falabella-gitlab/fastify-core-token");
const memcachePlugin = require("./plugins/memcache");
const { validateAuthToken } = require('./hooks/validateAuthToken');
const { getLogger } = require('./logger/index');

const oas = require('fastify-oas');

const cors = require('fastify-cors');

const { retrieveCountryCode } = require('./hooks/retrieveCountryCode');

const { retrieveBUName } = require('./hooks/retrieveBUName');

const { customErrorHandler } = require('@store-service/error-handler');

const { swagger_options } = require('./config/swagger');

const routes = require('./routes')

const package_json_values = require("../package.json");

const pinoOptions = {
  fastify: {},
  errors: { notFound: "extraviado" },
  histogram: {},
  health: { exposeStatusRoute: "/ping" },
  caching: {},
  metrics: { timestamps: true }
}

async function create() {
  //logger configuration
  let fastify = {};

  pinoOptions.logger = getLogger();

  fastify = core.createServer(pinoOptions);

  fastify.register(fastifyRequestContextPlugin, {
    defaultStoreValues: {
      request: {
        api: '',
        tag: ''
      }
    }
  });

  fastify.register(fastifyCoreToken);

  fastify.register(customErrorHandler());

  fastify.register(oas, swagger_options);
  fastify.register(memcachePlugin)

  fastify.addHook("onRequest", loadStaticContent);

  fastify.addHook("preHandler", validateAuthToken);

  fastify.addHook("preHandler", retrieveCountryCode);

  fastify.addHook("preHandler", retrieveBUName);

  fastify.register(cors);
  //attaching fastify logger to global, make use in the nested methods
  if(!global.log) {
    global.log = fastify.log;
  }

  fastify.get('/version',(req,reply) => {
    reply.send({version: `${package_json_values.version}`})
  })
  fastify.register(routes , { prefix : '/v1/'});
  //mapping fastify instance to request
  fastify.decorateRequest('fastify', fastify);

  return fastify;
}
const loadStaticContent = async (req, reply) => {
  if (req.raw.url.includes('/documentation')) {
    reply.raw = { statusCode: 304 }
  }
}

async function start() {
  const fastify = await create();
  let options = {}
  if(process.env.STORE_DOMAIN_HOST !== 'undefined' && process.env.STORE_DOMAIN_PORT !== 'undefined'){
    options = {
      ...{host : process.env.STORE_DOMAIN_HOST},
      ...{port : process.env.STORE_DOMAIN_PORT}
    }
  }
  core.start(fastify,options);
}

try {
  start();
  global.log.info(
    `STORE_SERVICE application started with version : ${package_json_values.version}`
  );
}catch(err){
  global.log.error(err);
  process.exit(1)
}

module.exports = {
  create,
  start
}