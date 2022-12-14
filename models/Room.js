const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please specify a name for room"],
        trim: 100,
        maxLength: [100, "Room name cant be more than 100 characters"]
    },
    pricePerNight: {
        type: Number,
        required: [true, "Please specify a price for room"],
        maxLength: [4, "Room price cant be more than 4 characters"],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, "Please specify a description for room"],
    },
    address: {
        type: String,
        required: [true, "Please specify a address for room"],
    },
    guestCapacity: {
        type: Number,
        required: [true, "Please specify a guests capacity for room"],
    },
    numOfBeds: {
        type: Number,
        required: [true, "Please specify a number of beds for room"],
    },
    internet: {
        type: Boolean,
        default: false,
    },
    breakfast: {
        type: Boolean,
        default: false,
    },
    airConditioned: {
        type: Boolean,
        default: false,
    },
    petsAllowed: {
        type: Boolean,
        default: false,
    },
    roomCleaning: {
        type: Boolean,
        default: false,
    },
    ratings: {
        type: Number,
        default: 0,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            }
        }
    ],
    category: {
        type: String,
        required: [true, "Please specify a category for room"],
        enum: {
            values: ["King", "Single", "Twins"],
            message: "Please specify a correct category for room",
        }
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = mongoose.models.Room || mongoose.model('Room', roomSchema)