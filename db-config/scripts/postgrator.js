const Postgrator = require('postgrator');
const path = require("path");
 

const getPostgrator = (config,action) => {

    return new Postgrator({
        migrationDirectory: config.migrationDirectory,
        driver: 'pg',
        host: config.db_host,
        port: 5432,
        database: config.db_name,
        username: config.db_user,
        password: config.db_password,
        schemaTable: 'schemaversion',
        action
      })
}

module.exports = {
    getPostgrator
}
 