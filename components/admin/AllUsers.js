import React from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { BiRupee } from 'react-icons/bi'
import { MDBDataTable } from 'mdbreact'
import router, { useRouter } from 'next/router'
import Loader from '../layout/Loader'
import { allUsers, clearErrors, deleteUser } from '../../redux/actions/userActions'
import { DELETE_USER_ADMIN_RESET } from '../../redux/constants/userConstants'

const AllUsers = () => {
    const dispatch = useDispatch()
    const { users, loading, error } = useSelector(state => state.allUsers)
    const { isDeleted, loading: isDeletedLoading, error: isDeletedError } = useSelector(state => state.user)
    React.useEffect(() => {
        dispatch(allUsers())
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
        if (isDeletedError) {
            toast.error(isDeletedError)
            dispatch(clearErrors())
        }
        if (isDeleted) {
            toast.success('User is deleted successfully!')
            router.push('/admin/users')
            dispatch({ type: DELETE_USER_ADMIN_RESET })
        }
    }, [dispatch, isDeleted, isDeletedError])

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'User ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role [admin/user]',
                    field: 'role',
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
        users && users.forEach(element => {
            data.rows.push({
                id: element._id,
                name: element.name,
                email: element.email,
                role: <>{element.role}</>,
                actions: (
                    <>
                        <Link href={`/admin/users/${element._id}`} legacyBehavior>
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
        dispatch(deleteUser(id))
    }
    return (
        <div className='container container-fluid'>
            <h1 className='mt-5 mb-3'>{loading ? ("Fetching All Users...") : `All Users`}</h1>
            <h5>{!loading && `Fetched ${users && users.length} results`}</h5>
            {loading ? <Loader /> : (
                <>
                    <MDBDataTable
                        data={setUsers()}
                        className='px-3'
                        bordered
                        striped
                        hover
                    />
                </>
            )}
        </div>
    )
}

export default AllUsers