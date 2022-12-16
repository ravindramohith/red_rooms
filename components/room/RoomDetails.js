import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors } from '../../redux/actions/roomActions'
import { checkBooking, checkBookedDates, getMyBookings } from '../../redux/actions/bookingActions'
import { Carousel } from 'react-bootstrap'
import { BiRupee } from 'react-icons/bi'
import RoomFeatures from './RoomFeatures'
import { useRouter } from 'next/router'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { toast } from 'react-toastify'
import axios from 'axios'
import { CHECK_BOOKING_RESET } from '../../redux/constants/bookingConstants'
import getStripe from '../../utils/getStripe'

const RoomDetails = () => {
    const [checkInDate, setCheckInDate] = React.useState()
    const [checkOutDate, setCheckOutDate] = React.useState()
    const [daysOfStay, setDaysOfStay] = React.useState()
    const [paymentLoading, setPaymentLoading] = React.useState(false)
    const { user } = useSelector(state => state.auth)
    const { dates } = useSelector(state => state.bookedDates)
    const { room, error } = useSelector(state => state.roomDetails)
    const { available, loading: bookLoading } = useSelector(state => state.checkBooking)
    const dispatch = useDispatch()
    const router = useRouter()
    const { id } = router.query
    const excludedDates = []
    dates.forEach(date => {
        excludedDates.push(new Date(date))
    })

    React.useEffect(() => {
        dispatch(checkBookedDates(id))
        if (error) {
            toast.error(error + ", Redirecting to Homepage...")
            dispatch(clearErrors())
            router.push('/')
        }
        return () => {
            dispatch({ type: CHECK_BOOKING_RESET })
        }
    }, [dispatch, id])

    const onChange = (dates) => {
        const [checkInDate, checkOutDate] = dates;
        setCheckInDate(checkInDate)
        setCheckOutDate(checkOutDate)
        if (checkInDate && checkOutDate) {
            const days = Math.floor(((new Date(checkOutDate) - new Date(checkInDate)) / 86400000) + 1)
            setDaysOfStay(days)
            dispatch(checkBooking(id, checkInDate.toISOString(), checkOutDate.toISOString()))
        }
    }

    const newBookingHandler = async () => {
        const BookingData = {
            room: router.query.id,
            checkInDate,
            checkOutDate,
            daysOfStay,
            amountPaid: 90,
            paymentInfo: {
                id: "STRIPE",
                status: "OK",
            }
        }
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            const { data } = await axios.post(`/api/bookings`, BookingData, config)
        } catch (err) { console.log(err); }
    }

    const bookRoom = async (id, pricePerNight) => {
        setPaymentLoading(true);
        const amount = pricePerNight * daysOfStay;
        try {
            const link = `/api/checkout_session/${id}?checkInDate=${checkInDate.toISOString()}&checkOutDate=${checkOutDate.toISOString()}&daysOfStay=${daysOfStay}`
            const { data } = await axios.get(link, { params: { amount } });
            const stripe = await getStripe();
            stripe.redirectToCheckout({ sessionId: data.id })
            setPaymentLoading(false);

        } catch (err) {
            setPaymentLoading(false);
            console.log(err);
            toast.error(err);
        }
    }

    return (
        <>{room &&
            <Head>
                <title>{room.name} | Details</title>
            </Head>
        }
            {room &&
                <div className="container container-fluid">
                    <h2 className='mt-5'>{room.name}</h2>
                    <p>{room.address}</p>

                    <div className="ratings mt-auto mb-3">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${(room.ratings / 5) * 100}%` }}></div>
                        </div>
                        <span id="no_of_reviews">({room.numOfReviews} Reviews)</span>
                    </div>

                    <Carousel hover='pause'>
                        {room.images && room.images.map(image => (
                            <Carousel.Item key={image.public_id}>
                                <div style={{ width: '100%', height: '440px' }}>
                                    <Image
                                        className='d-block m-auto'
                                        src="https://a0.muscache.com/im/pictures/a8f6a489-d236-4d2d-a57b-a95d928970af.jpg?im_w=960"
                                        alt={room.name}
                                        layout='fill'
                                    />
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>

                    <div className="row my-5">
                        <div className="col-12 col-md-6 col-lg-8">
                            <h3>Description</h3>
                            <p>{room.description}</p>
                            <RoomFeatures room={room} />
                        </div>

                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="booking-card shadow-lg p-4">
                                <p className='price-per-night'><b><BiRupee />{room.pricePerNight}</b> / night</p>
                                <p className='mt-5 mb-3'>
                                    Pick Check In and Check Out Dates
                                </p>
                                <DatePicker
                                    className='w-100'
                                    selected={checkInDate}
                                    onChange={onChange}
                                    startDate={checkInDate}
                                    endDate={checkOutDate}
                                    minDate={new Date()}
                                    excludeDates={excludedDates}
                                    selectsRange
                                    inline
                                />
                                {available === true && <div className='alert alert-success my-3 font-weight-bold'>Room is available! Book now.</div>}
                                {available && !user && <div className='alert alert-danger my-3 font-weight-bold'>Please Login to book Room.</div>}
                                {available === false && <div className='alert alert-danger my-3 font-weight-bold'>Room is not available!</div>}
                                {available && user && <button className="btn btn-block py-3 booking-btn" onClick={() => bookRoom(room._id, room.pricePerNight)} disabled={bookLoading || paymentLoading ? true : false}>Pay <BiRupee />{daysOfStay * room.pricePerNight}</button>}
                            </div>
                        </div>
                    </div>


                    <div className="reviews w-75">
                        <h3>Reviews:</h3>
                        <hr />
                        <div className="review-card my-3">
                            <div className="rating-outer">
                                <div className="rating-inner"></div>
                            </div>
                            <p className="review_user">by John</p>
                            <p className="review_comment">Good Quality</p>

                            <hr />
                        </div>

                        <div className="review-card my-3">
                            <div className="rating-outer">
                                <div className="rating-inner"></div>
                            </div>
                            <p className="review_user">by John</p>
                            <p className="review_comment">Good Quality</p>

                            <hr />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default RoomDetails