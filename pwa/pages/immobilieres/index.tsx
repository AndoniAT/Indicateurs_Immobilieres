import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/immobiliere/Navbar"; 

const Welcome: NextComponentType<NextPageContext> = () => (
  <div className="text-center ">
    <Navbar /> 
    <Head>
      <title>WELCOME</title>
    </Head>
    <br /><br />
    <h1 className="text-5xl font-bold mb-2 mt-0">Université Le Havre Normandie</h1>
    <br />
    <br />
    <br />

    <h2 className="text-3xl font-bold mb-4">Application de Ventes Immobilières</h2>

    <br />
    <br />
    <br />

    <div className="mb-8">
      <h3 className="text-2xl font-bold mb-2">Membres du Groupe :</h3>
      <ul className="list-disc list-inside">
      <br />
        <li className="text-lg">Fouad Tekfa</li>
        <br />
        <li className="text-lg"> Andoni Alonso tort</li>
        <br />
        <li className="text-lg">Salim Mahdjane</li>
        <br />
        <li className="text-lg">Rafik Tekfa</li>
        <br />
      </ul>
    </div>

    <br />
    <br />
    <br />

    <div className="mb-4">
      <h3 className="text-2xl font-bold mb-2">Enseignant :</h3>
      <br />
      <ul className="list-disc list-inside">
      <li className="text-lg">M. Yoann Pigne</li>
      </ul>
    </div>
    <br />
    <br />
    <br />
    <div>
      <p className="text-2xl  ">Module: Développement Web       |       Année Universitaire: 2023/2024</p>
    </div>
  </div>
);

export default Welcome;

