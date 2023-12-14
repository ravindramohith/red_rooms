import React from "react";
import { getSession } from "next-auth/client";
import AllUsers from "../../../components/admin/AllUsers";
import Layout from "../../../components/layout/Layout";

const AllUsersPage = () => {
  return (
    <Layout title=" All Users | Admin | Red Rooms">
      <AllUsers />
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
export default AllUsersPage;
