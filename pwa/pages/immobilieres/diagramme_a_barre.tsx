import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { DiagrammeABarre } from "../../components/immobiliere/Diagramme_a_barre";
import Navbar from "../../components/immobiliere/Navbar"

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Diagramme à barre</title>
      </Head>
      <Navbar/>
      <DiagrammeABarre immobilieres={[]}></DiagrammeABarre>
    </div>
  </div>
);

export default Page;
