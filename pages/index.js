import Home from '../components/Home'
import Layout from '../components/layout/Layout'
import { wrapper } from '../redux/store'
import { getRooms } from '../redux/actions/roomActions'

export default function Index() {
  return (
    <Layout>
      <Home />
    </Layout>
  )
}


export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  await context.store.dispatch(getRooms(context.req))
})