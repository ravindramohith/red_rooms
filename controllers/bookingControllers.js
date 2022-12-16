import Booking from '../models/Booking'
import ErrorHandler from '../utils/errorController';
import catchAsync from '../middlewares/catchAsync'
import Moment from 'moment';
import { extendMoment } from 'moment-range';

const moment = extendMoment(Moment)

export const newBooking = catchAsync(async (req, res) => {
    const {
        room,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo
    } = req.body;
    const booking = await Booking.create({
        room,
        user: req.user._id,
        checkInDate,
        checkOutDate,
        daysOfStay,
        amountPaid,
        paymentInfo,
        paidAt: Date.now()
    })
    res.status(200).json({
        success: true,
        booking
    })
})

export const checkRoomAvailability = catchAsync(async (req, res) => {
    let { room_id, checkInDate, checkOutDate } = req.query;
    checkInDate = new Date(checkInDate);
    checkOutDate = new Date(checkOutDate);
    const bookings = await Booking.find({
        room: room_id,
        $and: [{
            checkInDate: {
                $lte: checkOutDate
            }
        }, {
            checkOutDate: {
                $gte: checkInDate
            }
        }]
    })
    let isAvailable = bookings && bookings.length === 0;
    res.status(200).json({
        success: true,
        isAvailable
    })
})

export const checkBookedDates = catchAsync(async (req, res) => {
    const { room_id } = req.query;

    const bookings = await Booking.find({ room: room_id });

    let bookedDates = [];

    const timeDiffernece = moment().utcOffset() / 60;

    bookings.forEach(booking => {

        const checkInDate = moment(booking.checkInDate).add(timeDiffernece, 'hours')
        const checkOutDate = moment(booking.checkOutDate).add(timeDiffernece, 'hours')

        const range = moment.range(moment(checkInDate), moment(checkOutDate));

        const dates = Array.from(range.by('day'));
        bookedDates = bookedDates.concat(dates);
    })

    res.status(200).json({
        success: true,
        bookedDates
    })
})

export const getMyBookings = catchAsync(async (req, res) => {

    const myBookings = await Booking.find({ user: req.user._id }).populate({
        path: 'room',
        select: 'name pricePerNight images',
    }).populate({
        path: 'user',
        select: 'name email'
    })

    res.status(200).json({
        success: true,
        myBookings
    })
})


export const getBooking = catchAsync(async (req, res) => {

    const booking = await Booking.findById(req.query.id).populate({
        path: 'room',
        select: 'name pricePerNight images',
    }).populate({
        path: 'user',
        select: 'name email'
    })

    res.status(200).json({
        success: true,
        booking
    })
})