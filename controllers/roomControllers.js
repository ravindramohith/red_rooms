import Room from "../models/Room"
import Booking from '../models/Booking'
import ErrorHandler from "../utils/errorController"
import catchAsync from "../middlewares/catchAsync"
import APIFeatures from "../utils/apiFeatures"
import cloudinary from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


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
    const images = req.body.images
    let imageLinks = []
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'RedRooms/rooms',
        })
        imageLinks.push({
            public_id: result.public_id,
            url: result.secure_url
        })
    }
    req.body.images = imageLinks
    req.body.user = req.user._id
    const room = await Room.create(req.body)
    res.status(201).json({
        success: true,
        room: room
    })
})

const getSingleRoom = catchAsync(async (req, res, next) => {
    console.log(req.query.id)
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
    if (req.body.images) {
        //delete all prev images
        for (let image of room.images) {
            await cloudinary.v2.uploader.destroy(image.public_id)
        }
        const images = req.body.images
        let imageLinks = []
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'RedRooms/rooms',
            })
            imageLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })
        }
        req.body.images = imageLinks
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
    for (let image of room.images) {
        await cloudinary.v2.uploader.destroy(image.public_id)
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

const allRoomsAdmin = catchAsync(async (req, res, next) => {

    const rooms = await Room.find();

    res.status(200).json({
        success: true,
        rooms
    })
})

const allReviewsAdmin = catchAsync(async (req, res) => {

    const room = await Room.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: room.reviews
    })
})

const deleteReviewAdmin = catchAsync(async (req, res) => {

    const room = await Room.findById(req.query.id);

    const reviews = room.reviews.filter(review => review._id.toString() !== req.query.reviewId);

    const numOfReviews = reviews.length;
    let ratings = 0
    if (reviews.length !== 0) {
        ratings = room.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length
    }

    await Room.findByIdAndUpdate(req.query.id, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})


export {
    allRooms,
    newRoom,
    getSingleRoom,
    updateSingleRoom,
    deleteSingleRoom,
    createRoomReview,
    checkReviewAvailability,
    allRoomsAdmin,
    allReviewsAdmin,
    deleteReviewAdmin
}