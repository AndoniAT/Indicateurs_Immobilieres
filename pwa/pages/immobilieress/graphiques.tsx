import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { Graphique } from "../../components/immobilieres/Graphique"

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Graphiques</title>
      </Head>
      <Graphique immobilieress={[]}>

      </Graphique>
    </div>
  </div>
);

export default Page;
