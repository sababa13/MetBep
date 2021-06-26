const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongod = new MongoMemoryServer();

//connect to database
module.exports.connect = async () => {
    const uri = await mongod.getURI();
    const mongooseOpts = {
        useNewUrlParseer: true,
        useUnifiedTopology: true,
        poolSize: 10
    };
    await mongoose.connect(uri, mongooseOpts);
}

//disconnect and close connection
module.exports.closeDatabase = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.close();
}

// clear the db, remove all data
module.exports.clearDatabase = async () => {
    for (const key in collection) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}