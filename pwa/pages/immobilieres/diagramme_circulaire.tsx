import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";
import { DiagrammeCirculaire } from '../../components/immobiliere/Diagramme_circulaire'
import Navbar from '../../components/immobiliere/Navbar'
import {getVentesRegionsInformation} from '../../components/ServiceApi'
import React, { useEffect, useState } from "react";

//const years = [2018, 2019, 2020, 2021, 2022, 2023];

export default function() {
  const [items, setItems] = useState<VentesRegions[]>([]);
  const [itemsSelected, setItemsSelected] = useState<VentesRegions[]>([]);  
  const [selectedYear, setSelectedYear] = useState<string>();

  useEffect(() => {    
    getVentesRegionsInformation().then( ventes => {
      setItems(ventes.data.ventesRegions);
    
      if(itemsSelected.length == 0 ) {
        let itemsRes:VentesRegions[] = ventes.data.ventesRegions;
        let initYear = itemsRes.map( i => i.anne)[ 0 ];
        let newItems = itemsRes.filter( item => item.anne == initYear );  
        setItemsSelected(newItems);
      }
    });

  }, []);

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = event.target.value;
    let newItems = items.filter( item => item.anne == newYear );
    setSelectedYear(newYear);
    setItemsSelected(newItems);
  };

  let years:string[] = [];
  items.forEach( i => {
      if( !years.includes(i.anne) ) {
        years.push( i.anne );
      }
  });

  return ( 
    <>
      <div>
        <Navbar /> 
        <div style={{ marginTop: '30px', marginLeft: '60px', display: 'inline-flex', width: '100%'}}>
          <label style={{display: 'inline-flex'}}>
            Année:
            <select value={selectedYear} onChange={handleYearChange}>
              <option value="" disabled>Choisissez une année</option>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </label>
          <div style={{margin: '0 auto', marginRight: '50%'}}>
            <div style={{fontSize: '20px'}}>Diagramme Circulaire</div>
          </div>
          </div>
        <div>  
        <DiagrammeCirculaire ventes={itemsSelected}>

        </DiagrammeCirculaire>
      </div>
    </div>
     
    </>
  );
};