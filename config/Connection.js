let mysql  = require('mysql');
let config = require('./config.js');
let con = mysql.createConnection(config);
con.connect((err) => {
    if(!err)
    {
        console.log('DB Connection Success.');
    }
    else
    {
        console.log('DB Connection failed \n Error : ' + JSON.stringify(err,undefined,2));
    }
});

module.exports = con;
