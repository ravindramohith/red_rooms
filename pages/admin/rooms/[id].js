import React from "react";
import { getSession } from "next-auth/client";
import UpdateRoom from "../../../components/admin/UpdateRoom";
import Layout from "../../../components/layout/Layout";

const UpdateRoomPage = () => {
  return (
    <Layout title=" UpdateRoom | Admin | Red Rooms">
      <UpdateRoom />
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
export default UpdateRoomPage;
