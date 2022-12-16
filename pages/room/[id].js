import Layout from '../../components/layout/Layout'
import RoomDetails from '../../components/room/RoomDetails'
import { wrapper } from '../../redux/store'
import { getRoom } from '../../redux/actions/roomActions'

export default function Index() {
    return (
        <Layout>
            <RoomDetails />
        </Layout>
    )
}


export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    await context.store.dispatch(getRoom(context.req, context.params.id))
})