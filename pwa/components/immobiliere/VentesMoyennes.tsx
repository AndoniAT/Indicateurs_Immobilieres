import { FunctionComponent } from "react";
import { Immobiliere } from "../../types/Immobiliere";
import * as d3 from "d3";
import React, { useRef, useEffect } from 'react';

interface Props {
  immobilieres: Immobiliere[];
}

interface IData {
    date: string;
    value: number;
}


const Graph: React.FC = () => {
    
    const d3Container = useRef<SVGSVGElement | null>(null);
  
    // test avec des données brutes
    const data: IData[] = [
      { date: '2015-01', value: 2 },
      { date: '2016-01', value: 2.5 },
      { date: '2017-01', value: 3 },
      { date: '2018-01', value: 3.5 },
      { date: '2019-01', value: 4 },
      { date: '2020-01', value: 4.5 },
      { date: '2022-01', value: 4.0 }
    ];
  
    useEffect(() => {
      if (d3Container.current) {
      
      const svg = d3.select(d3Container.current);
        //les dimensions et les marges de votre graphique
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;
  
        // nettoyer le contenu SVG précédent
        svg.selectAll("*").remove();
  
        // créer un nouveau groupe SVG avec les marges appropriées
        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
  
        // définire vos échelles et axes ici
        const x = d3.scaleTime()
          .domain(d3.extent(data, d => new Date(d.date)))
          .range([0, width]);
  
        const y = d3.scaleLinear()
          .domain([0, d3.max(data, d => d.value)])
          .range([height, 0]);
  
        g.append("g")
          .attr("transform", `translate(0,${height})`)
          .call(d3.axisBottom(x));
  
        g.append("g")
          .call(d3.axisLeft(y));
  
        // dessiner la ligne pour la série temporelle
        const line = d3.line<IData>()
          .x(d => x(new Date(d.date)))
          .y(d => y(d.value));
  
        g.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 1.5)
          .attr("d", line);
      }
    }, []);
  

  return (
    <div className="flex justify-center">
        <svg
            className="d3-component"
            width="85%"
            viewBox="0 0 800 400"
            ref={d3Container}
        />
    </div>
);
};

export const VentesMoyennes: FunctionComponent<Props> = ({ immobilieres }) => {

  return (
    <div className="p-4">
        <h1 className="text-3xl text-center mb-4">Évolution du prix moyen du m²</h1>
        <Graph />
        <div className="text-center mt-4">
            <p>Les données représentent l'évolution du prix moyen du mètre carré pour les appartements et maisons en France sur 5 ans.</p>
        </div>
    </div>
);
};


