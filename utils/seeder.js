const Room = require("../models/Room");
const mongoose = require("mongoose");
const rooms = require('../data/rooms.json');

mongoose.connect("mongodb://localhost:27017/RedRooms", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => { console.log("Successfully connected to MongoDB") }).catch((err) => { console.log("Error connecting to MongoDB, Error:", err) })

const seedRooms = async () => {
    try {
        if (process.argv[2] == "--import") {
            await Room.insertMany(rooms);
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