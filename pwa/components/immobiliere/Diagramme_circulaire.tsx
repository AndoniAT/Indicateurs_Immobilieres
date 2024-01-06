import { FunctionComponent, useEffect, useRef } from "react";
import * as d3 from "d3";

interface Props {}

export const DiagrammeCirculaire: FunctionComponent<Props> = () => {
  const chartRef = useRef<SVGSVGElement | null>(null);

  // Déclaration des données statiques
  const immobilieress = [
    { region: "Auvergne-Rhône-Alpes", ventes: 1600 },
    { region: "Bourgogne-Franche-Comté", ventes: 400 },
    { region: "Bretagne", ventes: 900 },
    { region: "Île-de-France", ventes: 4200 },
    { region: "Normandie", ventes: 2100 },
    { region: "Nouvelle-Aquitaine", ventes: 700 },
  ];

  useEffect(() => {
    if (!chartRef.current) return;

    // Nettoyer le contenu de l'élément avant d'ajouter le nouveau diagramme
    d3.select(chartRef.current).selectAll("*").remove();

    const data = immobilieress.map((item) => item.ventes);
    const totalSales = data.reduce((acc, value) => acc + value, 0);

    const width = 500;
    const height = 500;
    const radius = Math.min(width, height) / 2;

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const pie = d3.pie<number>().value((d) => d);
    const data_ready = pie(data);

    // Ajoutez une vérification pour s'assurer que d3.arc() est disponible
    if (typeof d3.arc === 'function') {
      svg.selectAll("pieces")
        .data(data_ready)
        .enter()
        .append("path")
        .attr("d", d3.arc().innerRadius(0).outerRadius(radius))
        .attr("fill", (_, i) => colorScale(i))
        .attr("stroke", "black")
        .style("stroke-width", "2px");

      svg.selectAll("pieces")
        .data(data_ready)
        .enter()
        .append("text")
        .text((d: any) => `${((d.data / totalSales) * 100).toFixed(2)}%`)
        .attr("transform", (d: any) => `translate(${d3.arc().innerRadius(0).outerRadius(radius).centroid(d)})`)
        .style("text-anchor", "middle");
    }

  }, [immobilieress]);

  return (
    <div className="p-4">
      <h1 className="text-3xl text-center mb-4">Diagramme Circulaire</h1>
      <div className="flex justify-center items-center" style={{ height: "100vh" }}>
        <div ref={chartRef}></div>
      </div>
    </div>
  );
};
