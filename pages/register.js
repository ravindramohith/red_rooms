import Register from "../components/auth/Register";
import Layout from "../components/layout/Layout";
import { getSession } from "next-auth/client";

export default function RegisterPage() {
  return (
    <Layout title="Register | Red Rooms">
      <Register />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  if (session) {
    return {
      redirect: {
        destination: "/",
        permenant: false,
      },
    };
  }

  return {
    props: {},
  };
}
