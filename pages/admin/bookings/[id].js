import React from "react";
import { getSession } from "next-auth/client";
import BookingDetails from "../../../components/booking/BookingDetails";
import Layout from "../../../components/layout/Layout";
import { wrapper } from "../../../redux/store";
import { getBooking } from "../../../redux/actions/bookingActions";

const BookingDetailsPage = () => {
  return (
    <Layout title="Booking Details | Red Rooms">
      <BookingDetails />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const session = await getSession({ req: context.req });

    if (!session || session.user.role !== "admin") {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
    await context.store.dispatch(
      getBooking(context.req.headers.cookie, context.req, context.params.id)
    );
  }
);

export default BookingDetailsPage;
