import Search from '../components/Search'
import Layout from '../components/layout/Layout'
import { wrapper } from '../redux/store'
import { getRooms } from '../redux/actions/roomActions'

export default function SearchPage() {
    return (
        <Layout>
            <Search />
        </Layout>
    )
}


// export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
//     console.log(context.query.location)
//     await context.store.dispatch(getRooms(context.req, Number(context.query.page), context.query.location))
// })