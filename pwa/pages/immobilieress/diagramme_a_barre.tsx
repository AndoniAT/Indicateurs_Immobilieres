import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { DiagrammeABarre } from "../../components/immobilieres/Diagramme_a_barre";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Diagramme à barre</title>
      </Head>
      <DiagrammeABarre immobilieress={[]}></DiagrammeABarre>
    </div>
  </div>
);

export default Page;
