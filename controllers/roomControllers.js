import Room from "../models/Room"
import Booking from '../models/Booking'
import ErrorHandler from "../utils/errorController"
import catchAsync from "../middlewares/catchAsync"
import APIFeatures from "../utils/apiFeatures"

const allRooms = catchAsync(async (req, res) => {

    const resPerPage = 4;
    const roomsCount = await Room.countDocuments()

    const apiFeatures = new APIFeatures(Room.find(), req.query).search().filter()

    let rooms = await apiFeatures.query
    let filteredRoomCount = rooms.length
    apiFeatures.pagination(resPerPage)
    rooms = await apiFeatures.query
    res.status(200).json({
        status: true,
        roomsCount,
        filteredRoomCount,
        resPerPage,
        rooms
    })
})

const newRoom = catchAsync(async (req, res) => {
    const room = await Room.create(req.body)
    res.status(201).json({
        success: true,
        room: room
    })
})

const getSingleRoom = catchAsync(async (req, res, next) => {
    const room = await Room.findById(req.query.id);
    if (!room) {
        return next(new ErrorHandler("Room not found with id " + req.query.id, 404))
    }
    res.status(200).json({
        success: true,
        room: room
    });
})

const updateSingleRoom = catchAsync(async (req, res) => {
    let room = await Room.findById(req.query.id);
    if (!room) {
        return next(new ErrorHandler("Room not found with id " + req.query.id, 404))
    }
    room = await Room.findByIdAndUpdate(req.query.id, req.body, { new: true, runValidators: true, useFindAndModify: false })
    res.status(200).json({
        success: true,
        room: room
    });
})

const deleteSingleRoom = catchAsync(async (req, res) => {
    let room = await Room.findById(req.query.id);

    if (!room) {
        return next(new ErrorHandler("Room not found with id " + req.query.id, 404))
    }

    await room.remove()
    res.status(200).json({
        success: true,
        message: 'Room has been deleted successfully'
    });
})

const createRoomReview = catchAsync(async (req, res, next) => {
    const { rating, comment, roomId } = req.body
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }
    const room = await Room.findById(roomId);
    if (!room) {
        return next(new ErrorHandler("Room not found with id " + roomId, 404))
    }

    const isReviewed = room.reviews.find(r => r.user.toString() === req.user._id.toString());
    if (!isReviewed) {
        room.reviews.push(review);
        room.numOfReviews = room.reviews.length;
    } else {
        room.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })
    }
    room.ratings = room.reviews.reduce((acc, item) => item.rating + acc, 0) / room.reviews.length
    await room.save({ validateBeforeSave: false })
    res.status(200).json({
        success: true,
    })
})

const checkReviewAvailability = catchAsync(async (req, res, next) => {
    const { roomId } = req.query
    console.log(req.query)

    const bookings = await Booking.find({ room: roomId, user: req.user._id })

    const isReviewAvailable = bookings && bookings.length > 0
    res.status(200).json({
        success: true,
        isReviewAvailable
    })
})


export {
    allRooms,
    newRoom,
    getSingleRoom,
    updateSingleRoom,
    deleteSingleRoom,
    createRoomReview,
    checkReviewAvailability
}