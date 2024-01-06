import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { DiagrammeCirculaire } from '../../components/immobiliere/Diagramme_circulaire'
import Navbar from '../../components/immobiliere/Navbar'
const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Diagramme Circulaire</title>
      </Head>
      <Navbar /> 
      
       <DiagrammeCirculaire immobilieress={[]}>

      </DiagrammeCirculaire>
    </div>
  </div>
);

export default Page;