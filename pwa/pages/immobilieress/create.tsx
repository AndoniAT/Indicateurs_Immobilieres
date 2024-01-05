import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import { Form } from "../../components/immobilieres/Form";
import Navbar from "../../components/immobilieres/Navbar"

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create Immobilieres</title>
      </Head>
    </div>
    <Navbar/>
    <Form />
  </div>
);

export default Page;
