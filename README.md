# Consuming Amazon RDS MySQL in SAP Cloud Platform via User-Provided Services

## 1. Scenario Background
#### What you will learn in this session

In this session, you will create a simple Node.js application called ‘MYSQL UPS Demo’ on the SAP Cloud Platform. The app will consume Amazon RDS MySQL instance via User-Provided Service on SAP Cloud Platform.

#### Application Landscape

‘MYSQL UPS Demo’ will be built on SAP Cloud Platform Cloud Foundry Environment and will consume the following services
* Application Runtime on SAP Cloud Platform
* MySQL on Amazon RDS via User-Provided Service

## 2.  Create a User-Provided Service in SAP Cloud Platform
#### Prerequisites
1. MySQL HostName: **codecampdemo.cxprddfwftdb.ap-south-1.rds.amazonaws.com**
2. MySQL Credentials: **codecampAdmin/c0deCampAdmin123**

#### Hands-on Tasks
1. Login to SAP Cloud Platform and navigate to the Sub-Account and Space as per the account details provided. Click on User-Provided Services under the Services Navigation Menu on the left.
![UPS-Screen](https://blogs.sap.com/wp-content/uploads/2019/07/34-2.png)
  
2. Click on ‘New Instance’. And provide an instance name (**Eg: 'awsmysqldb'**) and the credentials and endpoint url details in the JSON format mentioned below and MySQL Hostname and Credentials. 

Provide your I-Number in the value for 'db'. Click Save to create a new User-Provided Service

```javascript
{
	"username": "codecampAdmin",
	"password": "c0deCampAdmin123",
	"db": "devx_<I Number>",
	"hostname": "codecampdemo.cxprddfwftdb.ap-south-1.rds.amazonaws.com",
	"port": 3306,
	"uri": "jdbc:mysql://codecampdemo.cxprddfwftdb.ap-south-1.rds.amazonaws.com:3306/"
}
```
3. 

 
