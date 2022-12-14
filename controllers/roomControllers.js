import Room from "../models/Room"
import ErrorHandler from "../utils/errorController"
import catchAsync from "../middlewares/catchAsync"

const allRooms = catchAsync(async (req, res) => {
    const rooms = await Room.find()
    res.status(200).json({
        status: true,
        count: rooms.length,
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