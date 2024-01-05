import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/immobilieres/Navbar"; // Assurez-vous que le chemin d'accès est correct

const Welcome: NextComponentType<NextPageContext> = () => (
  <div>
    <Navbar /> 
    <div>
      <Head>
        <title>WELCOME</title>
      </Head>
      <div>WELCOME</div>
      
    </div>
  </div>
);

export default Welcome;