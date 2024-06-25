const Pool = require("pg").Pool;
const config = require('config');

const schemaCodes = {
    "25007": "schema_and_data_statement_mixing_not_supported",
    "3F000": "invalid_schema_name",
    "42P06": "duplicate_schema",
    "42P15": "invalid_schema_definition",
    "42000": "syntax_error_or_access_rule_violation",
    "42601": "syntax_error"
};

async function createSchema() {
    const schemaName = config.get("db.schema");
    const postgresRole = config.get("db.user");

    const pool = new Pool({
        user: postgresRole,
        host: "localhost",
        database: config.get("db.database"),
        password: config.get("db.password"),
        port: config.get("db.port")
    });

    let createSql = `CREATE SCHEMA IF NOT EXISTS ${schemaName} AUTHORIZATION ${postgresRole};`

    console.log('\ncreateSql:', createSql);
    await pool.query(createSql, (createErr, createRes) => {

        // check for errors
        if (createErr) {
        console.log("CREATE SCHEMA ERROR:", createErr.code, "--", schemaCodes[createErr.code])
        console.log("ERROR code:", createErr.code)
        console.log("ERROR detail:", createErr.detail)
        }
    });
}

createSchema();