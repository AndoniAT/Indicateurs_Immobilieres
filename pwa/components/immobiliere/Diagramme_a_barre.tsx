
import React, { useRef, useEffect, FunctionComponent } from 'react';
import * as d3 from 'd3';

interface BarChartProps {
  data: { date: string; sales: number }[];
  periode: string;
}

export const BarChart: FunctionComponent<BarChartProps> = ({ data, periode }) => {
  const d3Container = useRef(null);
  const tooltip = useRef(null);

  useEffect(() => {
    if (data && d3Container.current) {
      const margin = { top: 30, right: 30, bottom: 100, left: 60 },
        width = 800 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

      d3.select(d3Container.current).selectAll("svg").remove();

      const svg = d3
        .select(d3Container.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);


      let x, xAxis;
      let aggregatedData = data;

      // Aggrégation des données par mois ou année
      if (periode === "mois" || periode === "annee") {
        const salesByPeriod = data.reduce((acc, d) => {
          const periodKey =
            periode === "mois"
              ? d.date.substring(0, 7)
              : d.date.substring(0, 4);
          acc[periodKey] = (acc[periodKey] || 0) + d.sales;
          return acc;
        }, {});

        aggregatedData = Object.entries(salesByPeriod).map(
          ([period, sales]) => ({ date: period, sales })
        );
      }

      if (periode === "jour") {
        x = d3
          .scaleBand()
          .range([0, width])
          .domain(data.map((d) => d.date))
          .padding(0.1);
        xAxis = d3
          .axisBottom(x)
          .tickFormat((d) => d3.timeFormat("%d %B %Y")(new Date(d)));
      } else {
        const periodKeys = [...new Set(aggregatedData.map((d) => d.date))];
        x = d3.scaleBand().range([0, width]).domain(periodKeys).padding(0.1);
        xAxis = d3.axisBottom(x).tickFormat((d) => {
          if (periode === "mois") {
            return d3.timeFormat("%B %Y")(new Date(d + "-01"));
          } else {
            return d3.timeFormat("%Y")(new Date(d + "-01-01"));
          }
        });
      }

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(aggregatedData, (d) => d.sales)])
        .range([height, 0]);

      svg.append("g").call(d3.axisLeft(y));
      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");


      svg
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - height / 2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Nombre de Ventes");

      svg
        .append("line")
        .attr("x1", width)
        .attr("x2", width + 10)
        .attr("y1", height)
        .attr("y2", height)
        .attr("stroke", "black")
        .attr("marker-end", "url(#arrow-x)");

      svg
        .append("defs")
        .append("marker")
        .attr("id", "arrow-x")
        .attr("viewBox", "-10 -5 20 20")
        .attr("refX", 10)
        .attr("refY", 0)
        .attr("markerWidth", 20)
        .attr("markerHeight", 20)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("class", "arrow-head");

      svg
        .append("line")
        .attr("x1", 0)
        .attr("x2", 0)
        .attr("y1", 0)
        .attr("y2", -10)
        .attr("stroke", "black")
        .attr("marker-end", "url(#arrow-y)");

      svg
        .append("defs")
        .append("marker")
        .attr("id", "arrow-y")
        .attr("viewBox", "-10 -5 15 15")
        .attr("refX", 0)
        .attr("refY", 0)
        .attr("markerWidth", 20)
        .attr("markerHeight", 20)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L5,0L0,5")
        .attr("class", "arrow-head");

      var tooltip2 = d3.select("#div_customContent")
        .append("div")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px");


      const tooltipImage = "https://img.freepik.com/free-vector/colleagues-preparing-corporate-party-time-management-deadline-brand-event-event-brand-management-sponsored-event-organization-concept_335657-120.jpg?w=1380&t=st=1704561652~exp=1704562252~hmac=63998d79f7441c544a8f658399549a5e36ad569baa046c76d7b8384b9c700915"
      const bars = svg
        .selectAll(".bar")
        .data(aggregatedData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.date))
        .attr("width", x.bandwidth())
        .attr("y", height)
        .attr("height", 0)
        .attr("fill", "#a9fcf8")
        .transition()
        .duration(1000)
        .attr("y", (d) => y(d.sales))
        .attr("height", (d) => height - y(d.sales))
        .on("start", function (event, d) {
          tooltip2.style("visibility", "hidden");
        })
        .on("end", function (event, d) {
          // Code to execute when the transition ends
          tooltip2.style("visibility", "hidden");
          d3.select(this)
            .on("mouseover", function (event, d) {
              let displayDate;
              if (periode === "jour") {
                displayDate = d3.timeFormat("%d %B %Y")(new Date(d.date));
              } else {
                displayDate = d.date;
              }
              tooltip2
                .style("visibility", "visible")
                .html(`<span style='font-size: 30px;'>Vente par date :</span><h2>Date: ${displayDate}<br/>Ventes: ${d.sales}</h2><img src=${tooltipImage} width=200></img>`);
              d3.select(this)
                .transition()
                .duration(1000)
                .attr("fill", "#4a35d0")
                .attr("transform", "scale(1.02, 1.12)")
                .attr("transform-origin", "center");
            })
            .on("mousemove", function (event) {
              tooltip2.style("top", (event.pageY - 50) + "px").style("left", (event.pageX + 100) + "px");
              d3.select(tooltip.current)
                .style("left", `${event.pageX + 10}px`)
                .style("top", `${event.pageY - 10}px`);
            })
            .on("mouseout", function () {
              tooltip2.style("visibility", "hidden");
              d3.select(this)
                .transition()
                .duration(200)
                .attr("fill", "#a9fcf8")
                .attr("transform", "scale(1, 1)");

              d3.select(tooltip.current).style("opacity", 0);
            });
        });



    }
  }, [data, periode]);

  return (
    <>
      <style>
        {`
        
          .chart-container {
            background: rgb(105,98,214);
            background: linear-gradient(90deg, rgba(105,98,214,1) 0%, rgba(89,89,152,0.6320728975183824) 27%, rgba(255,255,255,1) 100%);
          }
          .title {
            font-size: 70px;
            font-weight: 600;
            color: #fdfdfe;
            text-shadow: 0px 0px 5px #b393d3, 0px 0px 10px #b393d3, 0px 0px 10px #b393d3,
              0px 0px 20px #b393d3;
              text-align: center;
          }
          
        `}
      </style>
      <div className="chart-container">
        <h1 className="title">Diagramme à barre</h1>
        <div ref={d3Container} style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }} ></div>
        <div id="div_customContent"></div>
      </div>
    </>
  );
};
