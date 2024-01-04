import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import { Form } from "../../components/immobilieres/Form";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create Immobilieres</title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
