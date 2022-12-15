import React from 'react'
import { toast } from 'react-toastify'
import { clearErrors } from '../../redux/actions/roomActions'
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'
import Image from 'next/image'
import { Carousel } from 'react-bootstrap'
import { BiRupee } from 'react-icons/bi'
import RoomFeatures from './RoomFeatures'
import { useRouter } from 'next/router'

const RoomDetails = () => {
    const { room, error } = useSelector(state => state.roomDetails)
    const dispatch = useDispatch()
    const router = useRouter()

    React.useEffect(() => {
        if (error) {
            toast.error(error + ", Redirecting to Homepage...")
            dispatch(clearErrors())
            router.push('/')
        }
    }, [])

    let QueryParams;
    if (typeof window !== 'undefined') { }
    return (
        <>{room &&
            <Head>
                <title>{room.name} | Details</title>
            </Head>
        }
            {room &&
                <div class="container container-fluid">
                    <h2 class='mt-5'>{room.name}</h2>
                    <p>{room.address}</p>

                    <div class="ratings mt-auto mb-3">
                        <div class="rating-outer">
                            <div class="rating-inner" style={{ width: `${(room.ratings / 5) * 100}%` }}></div>
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

                    <div class="row my-5">
                        <div class="col-12 col-md-6 col-lg-8">
                            <h3>Description</h3>
                            <p>{room.description}</p>
                            <RoomFeatures room={room} />
                        </div>

                        <div class="col-12 col-md-6 col-lg-4">
                            <div class="booking-card shadow-lg p-4">
                                <p class='price-per-night'><b><BiRupee />28</b> / night</p>
                                <button class="btn btn-block py-3 booking-btn">Pay</button>
                            </div>
                        </div>
                    </div>


                    <div class="reviews w-75">
                        <h3>Reviews:</h3>
                        <hr />
                        <div class="review-card my-3">
                            <div class="rating-outer">
                                <div class="rating-inner"></div>
                            </div>
                            <p class="review_user">by John</p>
                            <p class="review_comment">Good Quality</p>

                            <hr />
                        </div>

                        <div class="review-card my-3">
                            <div class="rating-outer">
                                <div class="rating-inner"></div>
                            </div>
                            <p class="review_user">by John</p>
                            <p class="review_comment">Good Quality</p>

                            <hr />
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default RoomDetails