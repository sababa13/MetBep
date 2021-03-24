const express   = require('express');
const app       = express();
const dbConfig  = require ('./config/db.config');
var fs          = require("fs");
var routePath   = "./routes/";

const db = require("./models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies

// Route to Start Page
app.get("/start", (req, res) => {
  res.json({ message: "Welcome to MetBep application." });
});

/**
* Dyanmic Routing
* Adds all routes from routes folder
*/ 
fs.readdirSync(routePath).forEach(function(file) {
    var route = routePath + file;
    require(route)(app);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.\n`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        role_name: "employee"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("Added 'employee' to roles collection");
      });

      new Role({
        role_name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("Added 'admin' to roles collection");
      });
    }
  });
}