import React from "react";
import { getSession } from "next-auth/client";
import MyBookings from "../../components/booking/MyBookings";
import Layout from "../../components/layout/Layout";
import { wrapper } from "../../redux/store";
import { getMyBookings } from "../../redux/actions/bookingActions";

const MyBookingsPage = () => {
  return (
    <Layout title="My Bookings | Red Rooms">
      <MyBookings />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const session = await getSession({ req: context.req });

    if (!session) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    await context.store.dispatch(
      getMyBookings(context.req.headers.cookie, context.req)
    );
  }
);

export default MyBookingsPage;
