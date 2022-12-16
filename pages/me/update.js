import React from 'react'
import { getSession } from 'next-auth/client'
import Profile from '../../components/user/Profile'
import Layout from '../../components/layout/Layout'

const UpdateProfilePage = ({ session }) => {
    console.log(session.user)
    return (
        <Layout title='Update Your Profile | Red Rooms'>
            <Profile />
        </Layout>
    )
}


export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req })
    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permenant: false
            }
        }
    }

    return {
        props: { session }
    }
}
export default UpdateProfilePage