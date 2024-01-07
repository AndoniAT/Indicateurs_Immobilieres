import React, { FunctionComponent, useEffect, useRef } from "react";
import * as d3 from "d3";

interface VentesRegions {
  region: string;
  totalVente: number;
}

interface Props {
  ventes: VentesRegions[];
}

export const DiagrammeCirculaire: FunctionComponent<Props> = ({ ventes }) => {
  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!chartRef.current || ventes.length === 0) return;

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

    const tooltip = d3
      .select(chartRef.current)
      .append("div")
      .style("visibility", "hidden")
      .style("position", "absolute")
      .style("background-color", "rgba(255,255,255,0.9)")
      .style("padding", "10px")
      .style("border-radius", "5px")
      .style("box-shadow", "0 2px 5px rgba(0,0,0,0.1)")
      .style("z-index", "10");

  
    const legend = d3.select(chartRef.current)
      .append("div")
      .attr("class", "legend")
      .style("position", "absolute")
      .style("bottom", "10px")
      .style("left", "50%")
      .style("transform", "translateX(-50%)")
      .style("display", "flex");

    const legendItems = legend.selectAll(".legend-item")
      .data(ventes)
      .enter()
      .append("div")
      .attr("class", "legend-item")
      .style("display", "flex")
      .style("align-items", "center")
      .style("margin-right", "20px");

    legendItems.append("div")
      .style("width", "10px")
      .style("height", "10px")
      .style("background-color", (d, i) => colorScale(i));

    legendItems.append("div")
      .html((d, i) => `${d.region} (${((d.totalVente / totalSales) * 100).toFixed(2)}%)`);

    const pieces = svg.selectAll("pieces")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", d3.arc().innerRadius(0).outerRadius(radius))
      .attr("fill", (_, i) => colorScale(i))
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .each(function (d, i) {
        console.log("Adding mouseover event for piece:", i);
        d3.select(this)
          .on("mouseover", (event) => handleMouseOver(event, d, i))
          .on("mousemove", handleMouseMove)
          .on("mouseout", (event) => handleMouseOut(event, i));
      });

    function handleMouseOver(event, d, i) {
      console.log("Mouseover event triggered for piece:", i, "with data:", d);
      if (ventes && ventes[i]) {
        const region = ventes[i].region;
        const percentage = ((d.data / totalSales) * 100).toFixed(2);

        d3.select(this).attr("fill", d3.rgb(colorScale(i)).brighter());

        tooltip
          .style("visibility", "visible")
          .html(`
            <div style="display: flex; align-items: center;">
              <div style="width: 10px; height: 10px; background-color: ${colorScale(i)}; margin-right: 5px;"></div>
              <div>${region} (${percentage}%)</div>
            </div>
          `)
          .style("top", event.pageY + "px")
          .style("left", event.pageX + "px");
      }
    }

    function handleMouseMove(event) {
      tooltip
        .style("top", event.pageY + "px")
        .style("left", event.pageX + "px");
    }

    function handleMouseOut(event, i) {
      if (ventes && ventes[i]) {
        d3.select(this).attr("fill", colorScale(i));
        tooltip.style("visibility", "hidden");
      }
    }

  }, [ventes]);

  return (
    <div className="p-4" style={{ marginTop: '50px' }}>
      <div className="flex justify-center items-center" style={{ height: "70vh" }}>
        <div ref={chartRef}></div>
      </div>
    </div>
  );
};
