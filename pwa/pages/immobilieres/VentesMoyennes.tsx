import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { VentesMoyennes } from "../../components/immobiliere/VentesMoyennes"
import Navbar from "../../components/immobiliere/Navbar"
const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>VentesMoyennes</title>
      </Head>
      <Navbar /> 
      
       <VentesMoyennes immobilieres={[]}>

      </VentesMoyennes>
    </div>
  </div>
);

export default Page;
