import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import { Form } from "../../components/immobiliere/Form";
import Navbar from "../../components/immobiliere/Navbar"

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
