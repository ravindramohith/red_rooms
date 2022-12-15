import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RoomItem from './room/RoomItem'
import { toast } from 'react-toastify'
import { clearErrors } from '../redux/actions/roomActions'
import Pagination from 'react-js-pagination'
import { useRouter } from 'next/router'
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs'
import Link from 'next/link'

const Home = () => {

    const { rooms, resPerPage, roomsCount, filteredRoomCount, error } = useSelector(state => state.allRooms)
    const dispatch = useDispatch()
    const router = useRouter()
    let { page = 1, location } = router.query
    page = Number(page)

    let queryparms;
    if (typeof window !== 'undefined') {
        queryparms = new URLSearchParams(window.location.search)
    }

    React.useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
    }, [])

    const setPageNo = (pageNumber) => {
        if (queryparms.has('page')) {
            queryparms.set('page', pageNumber)
        }
        else {
            queryparms.append('page', pageNumber)
        }
        router.replace({ search: queryparms.toString() })
    }

    return (
        <>
            <section id="rooms" className="container mt-5">
                {location ? <h2 className='mb-3 ml-2 stays-heading'>Stays in {location}</h2> : <h2 className='mb-3 ml-2 stays-heading'>Rooms Available</h2>}
                <Link href="/search">
                    <a className='ml-2 back-to-search'>Search  <i className='fa fa-arrow-right'></i></a>
                </Link>
                <div className="row">
                    {rooms && rooms.length === 0 ?
                        (<div className="alert alert-danger mt-5 w-100"><b>Sorry, No Rooms Found!</b></div>) :
                        rooms.map(room => (
                            <RoomItem key={room._id} room={room} />
                        ))}
                </div>
            </section>
            {rooms &&
                <div className="d-flex justify-content-center mt-5">
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={resPerPage}
                        totalItemsCount={roomsCount}
                        onChange={setPageNo}
                        nextPageText={<BsFillArrowRightCircleFill />}
                        prevPageText={<BsFillArrowLeftCircleFill />}
                        firstPageText={"First"}
                        lastPageText={"Last"}
                        itemClass='page-item'
                        linkClass='page-link'
                    />
                </div>
            }
        </>
    )
}

export default Home