import { FunctionComponent } from "react";
import { Immobiliere } from "../../types/Immobiliere";
import * as d3 from "d3";
import React, { useRef, useEffect, useState } from 'react';

interface Props {
  immobilieres: SeriesGraph[];
}

const Graph: React.FC<Props> = ({immobilieres}) => {
  const d3Container = useRef<SVGSVGElement | null>(null);

  //immobilieres = exemple;
  let draw = () => {
    if (d3Container.current && immobilieres.length > 0) {
      const svg = d3.select(d3Container.current);
      // Les dimensions et les marges de votre graphique
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const width = 800 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;
  
      // Nettoyage du contenu SVG précédent
      svg.selectAll("*").remove();
  
      const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
  
      // Définition échelles et axes ici
        const x = d3
        .scaleTime()
        .domain(d3.extent(immobilieres, (d) => new Date(d.dateMutations)) as [Date, Date])
        .range([10, width]); // Ajoutez une marge à gauche
      
      const xAxis = d3.axisBottom(x).tickFormat(d3.timeFormat("%Y")); // Utilisez %Y pour l'année
      
      // Sélection uniquement des années distinctes
      const uniqueYears = Array.from(new Set(immobilieres.map((d) => new Date(d.dateMutations).getFullYear())));
      xAxis.tickValues(uniqueYears.map((year) => new Date(`${year}-01-01`))); // Première journée de chaque année pour afficher le mois
      xAxis.ticks(100);
      g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(xAxis)
        .selectAll("text")
        .style("font-size", "8px")
        .style("fill", "black");
      
  
      const y = d3.scaleLinear().domain([0, d3.max(immobilieres, (d) => d.price) || 0]).range([height, 0]);
  
      g.append("g").call(d3.axisLeft(y)).selectAll("text")
      .style("font-size", "6px");
  
      // Ligne pour la série temporelle
      const line = d3
        .line<SeriesGraph>()
        .x((d) => x(new Date(d.dateMutations)))
        .y((d) => y(d.price));
  
      g.append("path")
        .datum(immobilieres)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line);

        g.selectAll("circle")
      .data(immobilieres)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(new Date(d.dateMutations)))
      .attr("cy", (d) => y(d.price))
      .attr("r", 2);
    }
  };
  
  draw();
  

  draw(); 

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
    <div className="p-4" id="graphContainer">
        <h1 className="text-3xl text-center mb-4">Évolution du prix moyen du m²</h1>
        <Graph immobilieres={immobilieres}/>
        <div className="text-center mt-4">
            <p>Les données représentent l'évolution du prix moyen du mètre carré pour les appartements et maisons en France sur 5 ans.</p>
        </div>
    </div>
);
};


