import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { VentesMoyennes } from "../../components/immobiliere/VentesMoyennes"
import Navbar from "../../components/immobiliere/Navbar"
import { getSeriesGraphInformation } from "../../components/ServiceApi";
import React, { useEffect, useState } from "react";

function SeriesContent({items} : { items: SeriesGraph[]}){
  return (
    <div>
      <div>
        <Head>
          <title>VentesMoyennes</title>
        </Head>
        <Navbar />
        <VentesMoyennes immobilieres={items} />
      </div>
    </div>
  )
}

export default function SeriesPage() {
  const [items, setItems] = useState<SeriesGraph[]>([]);
  const [divWidth, setDivWidth] = useState(-1);
  useEffect(() => {
    getSeriesGraphInformation().then(series => {
      setItems(series.data.seriesGraphs);
    });
  }, []);

  return (
    <>
      <SeriesContent items={items} />
    </>
  );
}
