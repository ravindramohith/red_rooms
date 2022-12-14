import Room from "../models/Room"
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



export {
    allRooms,
    newRoom,
    getSingleRoom,
    updateSingleRoom,
    deleteSingleRoom
}