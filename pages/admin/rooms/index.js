import React from "react";
import { getSession } from "next-auth/client";
import AllRooms from "../../../components/admin/AllRooms";
import Layout from "../../../components/layout/Layout";

const AllRoomsPage = () => {
  return (
    <Layout title=" AllRooms | Admin | Red Rooms">
      <AllRooms />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (!session || session.user.role !== "admin") {
    return {
      redirect: {
        destination: "/login",
        permenant: false,
      },
    };
  }

  return {
    props: {},
  };
}
export default AllRoomsPage;
