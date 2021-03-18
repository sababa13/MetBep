MetBep
===

Installation:
1. Run
```
npm init -y
npm install ronin-server ronin-mocks
touch server.js
node server.js
```

[Install MongoDB for Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)

Start MongoDB
```
"C:\Program Files\MongoDB\Server\4.4\bin\mongo.exe"
```

```
docker build --tag node-docker .
docker run node-docker
docker run --publish 8000:8000 node-docker
```

Kill the process currently using a port on localhost in Windows
1. netstat -ano | findstr :<PORT>
2. taskkill /PID <PID> /F