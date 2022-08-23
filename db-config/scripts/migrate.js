const { getPostgrator } = require('./postgrator');

const ACTION = "do";

const pino = require("pino");

global.log = pino({
  name : "defaultLogger",
  level: "info",
  messageKey: "message",
  formatters: {
    level: (label) => {
      return { level: label };
    }
  },
  redact: {
    paths: [
      "db_password",
      "db_host"
    ],
    censor: "****"
}
});


  const migrate = async (config) => {
    log.info(config);
  
    const postgrator = getPostgrator(config, ACTION);
    postgrator.on("migration-started", migration =>
      log.info({ migration }, "Migration started")
    );
    postgrator.on("migration-finished", migration =>
      log.info({ migration }, "Migration finished")
    );
  
    try {
      const appliedMigrations = await postgrator.migrate();
      log.info(
        `Migration completed for ${appliedMigrations.length} migration files`
      );
    } catch (err) {
      log.error(err);
      console.log(err.message)
      process.exit(1);
    }
  };
  
module.exports = migrate;
  