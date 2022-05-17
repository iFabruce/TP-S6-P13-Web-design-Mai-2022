const Pool = require('pg').Pool;
module.exports =  new Pool({
    user: 'postgres',
    password: 'root',
    host: 'localhost',
    port: 5432,
    database: 'tp-s6-web-design'
});

