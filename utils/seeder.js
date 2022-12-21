const Room = require("../models/Room");
const mongoose = require("mongoose");
const rooms = require('../data/rooms.json');

mongoose.connect("mongodb://mohith:sandy@ac-tswascw-shard-00-00.op7d7ju.mongodb.net:27017,ac-tswascw-shard-00-01.op7d7ju.mongodb.net:27017,ac-tswascw-shard-00-02.op7d7ju.mongodb.net:27017/redRooms?ssl=true&replicaSet=atlas-a6kv3r-shard-0&authSource=admin&retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, }).then(() => { console.log("Successfully connected to MongoDB") }).catch((err) => { console.log("Error connecting to MongoDB, Error:", err) })

const seedRooms = async () => {
    try {
        if (process.argv[2] == "--import") {
            await Room.create(rooms);
            console.log("Data imported successfully");
        }
        else if (process.argv[2] == "--delete") {
            await Room.deleteMany();
            console.log("Existing Data deleted");
        }
        process.exit(0);
    } catch (err) { console.log(err); process.exit() }
}

seedRooms()