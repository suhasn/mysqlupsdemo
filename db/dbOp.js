const xsenv = require('@sap/xsenv');
// Module var
let __db, _con;

var upsInstanceName = '<YOUR UPS INSTANCE NAME>';
var host = xsenv.cfServiceCredentials(upsInstanceName).hostname;
var user = xsenv.cfServiceCredentials(upsInstanceName).username;
var password = xsenv.cfServiceCredentials(upsInstanceName).password;
var dbName = xsenv.cfServiceCredentials(upsInstanceName).db; // <CodeCampDB_INUMBER>;

const CREATE_EMPLOYEE_TABLE_SQL =
	'CREATE TABLE IF NOT EXISTS employee_details \
          ( \
              emp_id VARCHAR(255) PRIMARY KEY, \
              first_name VARCHAR(255), \
              last_name VARCHAR(255), \
              gender VARCHAR(255), \
              department VARCHAR(255))';

const CREATE_DATABASE_SQL = 'CREATE DATABASE IF NOT EXISTS '+dbName;

function _connectToDB() {
	if (!_con) {
		// we create and intialize the connection
		var mysql      = require('mysql');
		var connection = mysql.createConnection({
		  host     : host,
		  user     :user,
		  password : password,
			database : dbName
		});

		connection.connect(function(err){
		if(!err) {
		    console.log("Database is connected ... nn");
		} else {
		    console.log("Error connecting database ... nn");
		}
		});
		_con = connection;
	}

	return _con;
}

function getAllEmployees(cb) {
	const db = _connectToDB();

	db.query('SELECT * FROM employee_details', function (err, result, fields) {
    if (err) throw err;
    console.log(result);
		cb(null, result);
  });
}

function getEmployeeDetails(id, cb) {
	const db = _connectToDB();
	db.query('SELECT * FROM employee_details WHERE emp_id ='+id+' GROUP BY emp_id', function (err, result) {
    if (err) cb( err);
    console.log(result);
		cb(null, result);
  });
}

function addEmployeeDetails(data, cb) {
	const db = _connectToDB();
	db.query('INSERT INTO employee_details(emp_id, first_name, last_name, gender, department) values(?,?,?,?,?)', [data.empID, data.firstName,
			data.lastName, data.gender, data.department
		], function (err, result) {
	    if (err) cb(err);
	    console.log(result);
			cb(null, result);
	  });
}

function initializeDB(cb) {
	console.log("initializeDB ");
	createDB(function (error) {
		if (error) {
			console.error(`Error initializing database ${error.toString()}`);
			process.exit(-2);
		}
		const con = _connectToDB();

		con.query(CREATE_EMPLOYEE_TABLE_SQL, function (err, result) {
	    if (err) throw err;
	    console.log("Table created");
			cb();
	  });	});
}

function createDB(cb){
var mysql = require('mysql');


var con = mysql.createConnection({
	host: host,
	user: user,
	password: password
});

con.connect(function(err) {
	if (err) {
		cb( err);
	}
	else{
		console.log("Connected!");
	}

	con.query(CREATE_DATABASE_SQL, function (err, result) {
		if (err){
			cb(err);
		}
		console.log("New Database created");
		cb();
	});
});

}

module.exports = {
	initializeDB: initializeDB,
	getAllEmployees: getAllEmployees,
	addEmployeeDetails: addEmployeeDetails,
	getEmployeeDetails: getEmployeeDetails
};
