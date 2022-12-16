import React from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getMyBookings } from '../../redux/actions/bookingActions'
import { toast } from 'react-toastify'
import { BiRupee } from 'react-icons/bi'
import { MDBDataTable } from 'mdbreact'
import easyinvoice from 'easyinvoice'

const MyBookings = () => {
    const dispatch = useDispatch()
    const { myBookings, error } = useSelector(state => state.myBookings)
    const [PDFloading, setPDFLoading] = React.useState(false)
    React.useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch])

    const setBookings = () => {
        const data = {
            columns: [
                {
                    label: 'Booking ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Check In',
                    field: 'checkIn',
                    sort: 'asc'
                },
                {
                    label: 'Check Out',
                    field: 'checkOut',
                    sort: 'asc'
                },
                {
                    label: 'Amount Paid',
                    field: 'amount',
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

        myBookings && myBookings.forEach(element => {
            data.rows.push({
                id: element._id,
                checkIn: new Date(element.checkInDate).toLocaleString('en-US'),
                checkOut: new Date(element.checkOutDate).toLocaleString('en-US'),
                amount: (<><BiRupee />{element.amountPaid}</>),
                actions: (
                    <>
                        <Link href={`/bookings/${element._id}`}>
                            <a className='btn btn-primary'>
                                <i className='fa fa-eye'></i>
                            </a>
                        </Link>
                        <button className='btn btn-success mx-2' disabled={PDFloading} onClick={() => downloadInvoice(element)}>{!PDFloading ? (<i className='fa fa-download'></i>) : 'downloading...'}</button>
                    </>
                )
            })
        });

        return data;

    }

    const downloadInvoice = async (booking) => {
        const data = {
            "documentTitle": "Booking Recipt", //Defaults to INVOICE
            "currency": "INR",
            "taxNotation": "gst", //or gst
            "marginTop": 25,
            "marginRight": 25,
            "marginLeft": 25,
            "marginBottom": 25,
            "logo": "https://res.cloudinary.com/ravindramohith/image/upload/v1671133803/RedRooms/avatars/uzgovza26yjfl5eusg1i.png",
            "sender": {
                "company": "Red Rooms",
                "address": "Nayans Nature's Serene,Kukatpally",
                "zip": "500072",
                "city": "Hyderabad",
                "country": "India"
            },
            "client": {
                "company": `${booking.user.name}`,
                "address": `${booking.user.email}`,
                "city": `Check In: ${new Date(booking.checkInDate).toLocaleString('en-US')}`,
                "country": `Check In: ${new Date(booking.checkOutDate).toLocaleString('en-US')}`
            },
            "information": {
                // Invoice number
                "number": `${booking._id}`,
                // Invoice data
                "date": `${new Date(Date.now()).toLocaleString('en-US')}`,
                // Invoice due date
                "due-date": "31-12-2021"
            },
            "products": [
                {
                    "quantity": `${booking.daysOfStay}`,
                    "description": `${booking.room.name}`,
                    "tax": `0`,
                    "price": `${booking.room.pricePerNight}`
                }
            ],
            "bottom-notice": "This is auto generated Recipt of your booking on Red Rooms.",
            "settings": {
                "currency": "INR", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
                // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
                "tax-notation": "gst", // Defaults to 'vat'
                "margin-top": 25, // Defaults to '25'
                "margin-right": 25, // Defaults to '25'
                "margin-left": 25, // Defaults to '25'
                "margin-bottom": 25, // Defaults to '25'
                "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
                // "height": "1000px", // allowed units: mm, cm, in, px
                // "width": "500px", // allowed units: mm, cm, in, px
                // "orientation": "landscape", // portrait or landscape, defaults to portrait
            },
        };
        setPDFLoading(true);
        const result = await easyinvoice.createInvoice(data);
        easyinvoice.download(`RedRoomsRecipt_${booking._id}.pdf`, result.pdf)
        setPDFLoading(false);
    }

    return (
        <div className='container container-fluid'>
            <h1 className='my-5'>My Bookings</h1>
            <MDBDataTable
                data={setBookings()}
                className='px-3'
                bordered
                striped
                hover
            />
        </div>
    )
}

export default MyBookings