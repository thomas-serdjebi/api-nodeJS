const { createPool } = require('mysql');

const pool = createPool ({
    port: "3306",
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "node-api",

});

// pool.query("SELECT * FROM users",(err, data) => {
//     if(err) {
//         console.error(err);
//         return;
//     }
//     // rows fetch
//     console.log(data);
// });


module.exports = pool ;