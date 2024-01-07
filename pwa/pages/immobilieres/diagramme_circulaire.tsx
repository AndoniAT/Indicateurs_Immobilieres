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
    getVentesRegionsInformation()
      .then((ventes) => {
        setItems(ventes.data.ventesRegions);
  
        if (itemsSelected.length === 0) {
          let itemsRes: VentesRegions[] = ventes.data.ventesRegions;
          let initYear = itemsRes.map((i) => i.anne)[0];
          let newItems = itemsRes.filter((item) => item.anne === initYear);
          setItemsSelected(newItems);
        }
      })
      .catch((error) => {
        console.error("Error fetching vente regions information:", error);
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

  // return ( 
  //   <>
  //     <div>
  //       <Navbar /> 
  //       <div style={{ marginTop: '30px', marginLeft: '60px', display: 'inline-flex', width: '100%'}}>
  //         <label style={{display: 'inline-flex'}}>
  //           Année:
  //           <select value={selectedYear} onChange={handleYearChange}>
  //             <option value="" disabled>Choisissez une année</option>
  //             {years.map((year) => (
  //               <option key={year} value={year}>{year}</option>
  //             ))}
  //           </select>
  //         </label>
  //         <div style={{margin: '0 auto', marginRight: '50%'}}>
  //           <div style={{fontSize: '20px'}}>Diagramme Circulaire</div>
  //         </div>
  //         </div>
  //       <div>  
  //       <DiagrammeCirculaire ventes={itemsSelected}>

  //       </DiagrammeCirculaire>
  //     </div>
  //   </div>
     
  //   </>
  // );
  return (
    <>
      <div>
        <Navbar />
        <div className="mt-10 ml-10 flex w-full">
          <label className="flex items-center">
            Année:
            <select
              value={selectedYear}
              onChange={handleYearChange}
              className="ml-2 px-2 py-1 border border-gray-300 rounded"
            >
              <option value="" disabled>
                Choisissez une année
              </option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
          <div className="ml-auto mr-20" style={{ margin: '0 auto', marginRight: '50%' }}>
              <div className="text-xl font-bold">Diagramme Circulaire</div>
          </div>

        </div>
        <div className="p-4">
          <DiagrammeCirculaire ventes={itemsSelected} />
        </div>
      </div>
    </>
  );
};