const mysql=require('mysql2');

let mysqlConnection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'college'
});

mysqlConnection.connect((err)=>{
    if(err){
        console.log('Error in DB connection'+JSON.stringify(err,undefined,2));
    }
    else{
        console.log('DB connection succesfully');
    }
});

module.exports=mysqlConnection;