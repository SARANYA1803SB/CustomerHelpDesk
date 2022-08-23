# cutomer-help-desk

General purpose monorepo architecture service to connect to store
and share data with other services

# Prerequesites:

- Lerna is required to run the below commands.

### Install Project Dependencies

To be able to run the application properly you need to execute the
following commands:

Install all dependencies

    $ yarn install
    $ lerna bootstrap

## Postgres Set-up

- [Binary](https://www.postgresql.org/docs/11/installation.html)
- [Docker](https://hub.docker.com/_/postgres)

* Create a database
* Mention the details of database in the env below

## ENV variables needed to run services

Before starting the services, you need to create `.env` file
in the project root directory .

    DTE_SERVICE="https://api-qa-ftc-sc.falabella.com/esup-bll/v1"
    POSTGRES_USERNAME=""
    POSTGRES_PASSWORD=""
    POSTGRES_DATABASE=""
    POSTGRES_HOST=""
    POSTGRES_PORT=
    CASHIER_SFTP_HOST=""
    CASHIER_SFTP_USR=""
    CASHIER_SFTP_PWD=""

Refer to .env.example file for configuring the env variables.

## DB-Setup

Before running the application run db migrations to create
tables.

    $ cd apps/service

    $ yarn db-init

### Run Console Commands

In order to run your application service on different enviroments
you can use any of this. As well you may run other side card
executables for different purposes but usefull.

Run these commands from the application folder

\$ cd apps/service

For development enviroments you may use

    $ yarn dev

General production start you may use

    $ yarn prod

To run lint fixing you may use

    $ yarn lint

### Testing

Unit tests and integration tests are performed in a pre-push hook.

To run unit tests only (with silent logs):

    $ yarn test

To run unit tests and test coverage

    $ yarn test:coverage

### Linting

Code linting is performed in a pre-commit hook.

To performing code linting using eslint:

    $ yarn lint
