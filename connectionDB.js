import mysql from "mysql";


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'pruebas'
  });
   
  connection.connect(error=> {
    if (error) {
      console.error('error connecting: ' + error.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });

  export default connection