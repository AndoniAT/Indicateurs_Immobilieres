import { FunctionComponent } from "react";
import { Immobilieres } from "../../types/Immobilieres";
import * as d3 from "d3";
import React, { useRef, useEffect } from 'react';

interface Props {
  immobilieress: Immobilieres[];
}

interface IData {
    date: string;
    value: number;
}


const Graph: React.FC = () => {
    
    const d3Container = useRef<SVGSVGElement | null>(null);
  
    // Données brutes intégrées directement dans le composant pour le test
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
        // Définissez ici les dimensions et les marges de votre graphique
        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;
  
        // Nettoyez le contenu SVG précédent
        svg.selectAll("*").remove();
  
        // Créez un nouveau groupe SVG avec les marges appropriées
        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
  
        // Définissez vos échelles et axes ici
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
  
        // Dessinez la ligne pour la série temporelle
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
      <svg
        className="d3-component"
        width={800}
        height={400}
        ref={d3Container}
      />
    );
  };

export const Graphique: FunctionComponent<Props> = ({ immobilieress }) => {

    return (
        <div className="p-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl mb-2">Graphiques</h1>
              </div>
              <Graph></Graph>
        </div>
        );
}

