MetBep
===

## Install Dependencies
```
npm init -y
npm install ronin-server ronin-mocks
npm install --save nodemailer
npm install nodemailer-express-handlebars
npm install nodemailer-smtp-transport
npm install async
npm install crypto
npm install --save nodemailer-smtp-transport
npm install express mongoose body-parser cors jsonwebtoken bcryptjs --save
```
## Run backend
```
touch server.js
node server.js
```
OR
```
touch server.js
npm start
```

## Install MongoDB
[Install MongoDB for Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)

### Start MongoDB
```
"C:\Program Files\MongoDB\Server\4.4\bin\mongo.exe"
```

### Run Docker
```
docker build --tag node-docker .
docker run node-docker
docker run --publish 8000:8000 node-docker
```

### Create a folder for the project with command:
```
mkdir node-js-jwt-auth-mongodb
cd node-js-jwt-auth-mongodb
```
### Sign Up/Sign In
[SendGrid](https://sendgrid.com/)

### Issues
Kill the process currently using a port on localhost in Windows
1. netstat -ano | findstr :<PORT>
2. taskkill /PID <PID> /F

If MongoDB giving 'duplicate key error' on non-unique fields:
you'll need to explicitly drop the index to get rid of it.

### REST API

Sign Up, only admin can register a new employee:

POST    http://localhost:8000/users/signup
```json
{
    "first_name":"test",
    "last_name":"test1",
    "username":"usertest",
    "gender":"female",
    "email":"test@ati.utm.md",
    "city":"Chisinau",
    "medical_institution":"Sancos Clinic",
    "medical_institution_address":"Bulevardul Moscova 16",
    "personal_phone":"079111000",
    "password":"admin123!",
    "roles":["admin"]
}
```
Sign into account:

POST	http://localhost:8000/users/login
```json
{
    "username":"usertest",
    "password":"admin123!"
}
```

Start page:

GET     http://localhost:8000/start

Forgot password:

POST    http://localhost:8000/users/forgot-password
```json
{
    "email":"YOUR_EMAIL"
}
```

Reset password:
POST http://localhost:8000/users/reset-password/YOUR_TOKEN
```json
{
    "newPassword":"admin11111",
    "verifyPassword":"admin11111",
    "token":"YOUR_TOKEN"
}
```

#### More information about 
[Nodemailer](https://nodemailer.com/message/)
