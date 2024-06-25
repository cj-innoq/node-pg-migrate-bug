# How to reproduce

```shell
npm install
docker compose up -d
NODE_ENV=test node createSchema.js
npm run migrate:test
```

Look into the DB.

Expected: Tables `test`and `pgmigrations` are created in the schema `pgmigrations` defined in the `config/default.json`. This worked in 6.2.2

Actual: Tables `test`and `pgmigrations` are created in the schema `public`.

[JSON Configuration](https://salsita.github.io/node-pg-migrate/cli#json-configuration)
[Database Connection](https://salsita.github.io/node-pg-migrate/cli#database-connection)
