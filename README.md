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



