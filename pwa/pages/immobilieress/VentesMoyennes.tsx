import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { VentesMoyennes } from "../../components/immobilieres/VentesMoyennes"
import Navbar from "../../components/immobilieres/Navbar"
const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>VentesMoyennes</title>
      </Head>
      <Navbar /> 
      
       <VentesMoyennes immobilieress={[]}>

      </VentesMoyennes>
    </div>
  </div>
);

export default Page;
