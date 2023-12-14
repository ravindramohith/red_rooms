import React from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { BiRupee } from 'react-icons/bi'
import { MDBDataTable } from 'mdbreact'
import router, { useRouter } from 'next/router'
import Loader from '../layout/Loader'
import { getRoomsAdmin, deleteRoomAdmin } from '../../redux/actions/roomActions'
import { DELETE_ROOM_ADMIN_RESET } from '../../redux/constants/roomConstants'

const AllRooms = () => {
    const dispatch = useDispatch()
    const { rooms, loading, error } = useSelector(state => state.allRooms)
    const { isDeleted, loading: isDeletedLoading, error: isDeletedError } = useSelector(state => state.room)
    React.useEffect(() => {
        dispatch(getRoomsAdmin())
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
        if (isDeletedError) {
            toast.error(isDeletedError)
            dispatch(clearErrors())
        }
        if (isDeleted) {
            toast.success('Room is deleted successfully!')
            router.push('/admin/rooms')
            dispatch({ type: DELETE_ROOM_ADMIN_RESET })
        }
    }, [dispatch, isDeleted, isDeletedError])

    const setRooms = () => {
        const data = {
            columns: [
                {
                    label: 'Room ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price / Night',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Category',
                    field: 'category',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                },
            ],
            rows: []
        }
        rooms.rooms && rooms.rooms.forEach(element => {
            data.rows.push({
                id: element._id,
                name: element.name,
                category: element.category,
                price: <><BiRupee />{element.pricePerNight}</>,
                actions: (
                    <>
                        <Link href={`/room/${element._id}`} legacyBehavior>
                            <button className='btn btn-primary'>
                                <i className='fa fa-eye'></i>
                            </button>
                        </Link>
                        <Link href={`/admin/rooms/${element._id}`} legacyBehavior>
                            <button className='btn btn-warning'>
                                <i className='fa fa-pencil'></i>
                            </button>
                        </Link>
                        <button className='btn btn-danger mx-2' onClick={() => deleteRoomHandler(element._id)}>
                            <i className='fa fa-trash'></i>
                        </button>
                    </>
                )
            })
        });

        return data;
    }

    const deleteRoomHandler = (id) => {
        dispatch(deleteRoomAdmin(id))
    }
    return (
        <div className='container container-fluid'>
            <h1 className='my-5'>
                <Link
                    href='/admin/rooms/new'
                    className='my-0 mt-0 mb-0 btn text-white float-right new-room-btn'>
                    Create Room
                </Link>
            </h1>
            <h1 className='mt-5 mb-3'>{loading ? ("Fetching All Rooms...") : `All Rooms`}</h1>
            <h5>{!loading && `Fetched ${rooms.rooms && rooms.rooms.length} results`}</h5>
            {loading ? <Loader /> : (
                <>
                    <MDBDataTable
                        data={setRooms()}
                        className='px-3'
                        bordered
                        striped
                        hover
                    />
                </>
            )}
        </div>
    );
}

export default AllRooms