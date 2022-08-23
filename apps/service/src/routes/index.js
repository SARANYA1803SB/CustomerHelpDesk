const barcodeRoutes = require('@store-service/barcode');
const initializationRoutes = require('@store-service/initialization');
const cashierAuthorizationRoutes = require('@store-service/cashier-authorization');
const dteRoutes = require('@store-service/dte');
const receiptRoutes = require('@store-service/receipt');
const commonRoutes = require('@store-service/common/src/routes');
const catalogRoutes = require('@store-service/catalog/src/routes');
const storeApi = require('@store-service/store');
const rentalApi = require('@store-service/rental');
const authRoutes = require('@store-service/authentication');
const parkingTicketRoutes = require('@store-service/receipt/src/routes/parkingTicketRoutes');
const customerRoutes = require('@store-service/customer/src/routes');
const servicesContractRoutes = require('@store-service/services-contract/src/routes');
const cartRoutes = require('@store-service/cart/src/routes');
const feedbackRoutes = require('@store-service/feedback_form');

module.exports = async function routes(fastify) {
  fastify.register(barcodeRoutes);
  fastify.register(initializationRoutes);
  fastify.register(cashierAuthorizationRoutes);
  fastify.register(dteRoutes);
  fastify.register(receiptRoutes);
  fastify.register(commonRoutes);
  fastify.register(catalogRoutes);
  fastify.register(storeApi);
  fastify.register(rentalApi);
  fastify.register(authRoutes);
  fastify.register(parkingTicketRoutes);
  fastify.register(customerRoutes);
  fastify.register(servicesContractRoutes);
  fastify.register(cartRoutes);
  fastify.register(feedbackRoutes);
  if (process.env.ENABLE_EOD_REPORT_ROUTE === 'true') {
    fastify.register(require('@store-service/sales-report'));
  }
};
