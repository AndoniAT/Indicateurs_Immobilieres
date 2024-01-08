import { FunctionComponent, useEffect, useRef } from "react";
import * as d3 from "d3";

interface Props {
  ventes: VentesRegions[];
}

export const DiagrammeCirculaire: FunctionComponent<Props> = ({ventes}) => {
  const chartRef = useRef<SVGSVGElement | null>(null);


  useEffect(() => {
    if (!chartRef.current) return;

    d3.select(chartRef.current).selectAll("*").remove();

    const data = ventes.map((item) => item.totalVente);
    const totalSales = data.reduce((acc, value) => acc + value, 0);

    const width = 800;
    const height = 800;
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
        .text((d, i) => `${ventes[i].region} (${((d.data / totalSales) * 100).toFixed(2)}%)`)
        .attr("transform", (d: any) => `translate(${d3.arc().innerRadius(0).outerRadius(radius).centroid(d)})`)
        .style("text-anchor", "middle");
    }

  }, [ventes]);

  return (
    <div className="p-4" style={{marginTop: '50px'}}>
      <div className="flex justify-center items-center" style={{ height: "70vh" }}>
        <div ref={chartRef}></div>
      </div>
    </div>
  );
};
