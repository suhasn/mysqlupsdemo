# DevX Code-Camp: Consuming Hyperscaler Service in SAP Cloud Platform via User-Provided Services

## 1. Scenario Background
#### What you will learn in this session

In this session, you will create a simple Node.js application called ‘MYSQL UPS Demo’ on the SAP Cloud Platform. The app will consume Amazon RDS MySQL instance via User-Provided Service on SAP Cloud Platform.

#### Application Landscape

‘MYSQL UPS Demo’ will be built on SAP Cloud Platform Cloud Foundry Environment and will consume the following services
* Application Runtime on SAP Cloud Platform
* MySQL on Amazon RDS via User-Provided Service


### Prerequisites
* MySQL HostName: **codecampdemo.cxprddfwftdb.ap-south-1.rds.amazonaws.com**
* MySQL Credentials: **codecampAdmin/c0deCampAdmin123**

### Hands-on Tasks
##### (Create a User-Provided Service in SAP Cloud Platform)
1. Login to SAP Cloud Platform and navigate to the Sub-Account and Space as per the account details provided. Click on User-Provided Services under the Services Navigation Menu on the left.
![UPS-Screen](https://blogs.sap.com/wp-content/uploads/2019/07/34-2.png)
  
2. Click on ‘New Instance’. And provide an instance name (**Eg: 'awsmysqldb'**) and the credentials and endpoint url details in the JSON format mentioned below and MySQL Hostname and Credentials. 

![UPS Instance Creation](https://github.com/suhasn/mysqlupsdemo/blob/master/images/CFUPS.png)

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
##### (Create a Node.js application and Deploy on SAP Cloud Platform)
3. Download the application code from https://github.com/suhasn/mysqlupsdemo.git
4. Edit the manifest.yml file, review the file for the application configuration and update the Service Binding with the instance name that was created in Step 2.

```yaml
applications:
  - name: mysqlupsdemo
    memory: 512M
    buildpack: nodejs_buildpack
    services:
    - <YOUR UPS INSTANCE NAME>
 ```
 
5. Open the file db/dbOp.js in your text editor and provide the same UPS Instance Name in the code, this is required to fetch the conection parameters from the environment variables.
 ```javascript
 var upsInstanceName = '<YOUR UPS INSTANCE NAME>';
 ```

6. Now, from your Terminal/Command Prompt. Navigate to the application folder and point the CF CLI to our SAP Cloud Platform, account as follows:
* Identify the Cloud Foundry API Endpoint from the SAP Cloud Platform Cockpit:
```script
cf api <CF API ENDPOINT>
```
![CF API Endpoint](https://github.com/suhasn/mysqlupsdemo/blob/master/images/CFAPIENDPOINT.png)

* Set the CF CLI on Terminal to point to the above API Endpoint:
```script
cf api <CF API ENDPOINT>
```
![CF CLI Commands](https://github.com/suhasn/mysqlupsdemo/blob/master/images/CFCLI.png)
* Login with your SAP Cloud Platform credentials provided:
```script
cf login
```
![CF CLI Commands](https://github.com/suhasn/mysqlupsdemo/blob/master/images/CFCLI_copy.png)

* Verify the correct SubAccount and Space are listed. If you are member of more than one account in this region, you would have to choose the appropriate Account and Space. (As provided to you during the session)

7. Deploy the node.js application on SAP Cloud Platform.
```script
cf push
```

* With this the application should get deployed and be in started state.
![CF Push](https://github.com/suhasn/mysqlupsdemo/blob/master/images/CFPUSH.png)

* Verify that the application is deployed successfully and in running status on the SAP Cloud Platform Cockpit.

![CF Application Running ](https://github.com/suhasn/mysqlupsdemo/blob/master/images/4.png)

* Copy the application route URL from the cockpit and open in your brower to ensure the application is running.

![Browser Application Running ](https://github.com/suhasn/mysqlupsdemo/blob/master/images/5.png)

8. Connect SQL Client to Access the MySQL Database and enter values. Open SQuirrel SQL Client and create a new connection Alias as below with your database name:
![SQurriel Client Alias Creation](https://github.com/suhasn/mysqlupsdemo/blob/master/images/6.png)

9. Open the SQL Window for the database and insert some values using the query:
```sql
INSERT INTO employee_details(emp_id, first_name, last_name, gender, department) values ('101','John','Doe','Male','DevX')
```

10. Now call the application rest api to check the data on the browser.

![Rest API on browser](https://github.com/suhasn/mysqlupsdemo/blob/master/images/7.png)

With this we have successfully created and consumed a AWS MySQL service instance on SAP Cloud Platform node.js application using User-Provided Services.





