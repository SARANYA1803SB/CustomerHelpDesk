const migrate = require("./scripts/migrate");
const config = require("./config");

migrate(config.DB_CONFIG);