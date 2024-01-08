import * as d3 from 'd3';

export function processPeriodData(data, periode) {
  let aggregatedData = data;

  if (periode === "mois" || periode === "annee") {
    const salesByPeriod = data.reduce((acc, d) => {
      const periodKey =
        periode === "mois"
          ? d.date.substring(0, 7)
          : d.date.substring(0, 4);
      acc[periodKey] = (acc[periodKey] || 0) + d.totalVente; 
      return acc;
    }, {});

    aggregatedData = Object.entries(salesByPeriod).map(
      ([date, totalVente]) => ({ date, totalVente })
    );
  }

  return aggregatedData;
}

export function setupChart(container, width, height, margin) {
    const svg = d3.select(container)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  
    return svg;
  }

export function setupScales(data, width, height, periode) {
  let x, xAxis;
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, (d) => d.totalVente)])
    .range([height, 0]);

  if (periode === "jour") {
    x = d3.scaleBand()
      .range([0, width])
      .domain(data.map((d) => d.date))
      .padding(0.1);
    xAxis = d3.axisBottom(x).tickFormat(d => d3.timeFormat("%d %B %Y")(new Date(d)));
  } else {
    const periodKeys = [...new Set(data.map((d) => d.date))];
    x = d3.scaleBand().range([0, width]).domain(periodKeys).padding(0.1);
    xAxis = d3.axisBottom(x).tickFormat(d => {
      if (periode === "mois") {
        return d3.timeFormat("%B %Y")(new Date(d + "-01"));
      } else {
        return d3.timeFormat("%Y")(new Date(d + "-01-01"));
      }
    });
  }

  return [x, y, xAxis];
}

export function updateBars(svg, x, y, data, periode, tooltip) {
    const tooltipImage = "https://img.freepik.com/free-vector/colleagues-preparing-corporate-party-time-management-deadline-brand-event-event-brand-management-sponsored-event-organization-concept_335657-120.jpg?w=1380&t=st=1704561652~exp=1704562252~hmac=63998d79f7441c544a8f658399549a5e36ad569baa046c76d7b8384b9c700915";
  
    svg.selectAll(".bar")
      .data(data)
      .join(
        (enter) => enter
          .append("rect")
          .attr("class", "bar")
          .attr("x", (d) => x(d.date))
          .attr("y", y(0))
          .attr("width", x.bandwidth())
          .attr("height", 0)
          .attr("fill", "#a9fcf8") 
          .on("mouseover", function(event, d) {
            let displayDate = periode === "jour" ? d3.timeFormat("%d %B %Y")(new Date(d.date)) : d.date;
            d3.select("#div_customContent") 
              .style("visibility", "visible")
              .html(`<span style='font-size: 30px;'>Vente par date :</span><h2>Date: ${displayDate}<br/>Ventes: ${d.totalVente}</h2><img src=${tooltipImage} width=200></img>`);
            d3.select(this)
              .transition()
              .duration(200)
              .attr("fill", "#4a35d0"); 
          })
          .on("mousemove", function(event) {
            d3.select("#div_customContent")
              .style("top", (event.pageY - 50) + "px")
              .style("left", (event.pageX + 10) + "px");
          })
          .on("mouseout", function() {
            d3.select("#div_customContent").style("visibility", "hidden");
            d3.select(this)
              .transition()
              .duration(200)
              .attr("fill", "#a9fcf8"); 
          })
          .transition()
          .duration(1000)
          .attr("y", (d) => y(d.totalVente))
          .attr("height", (d) => y(0) - y(d.totalVente)),
        (update) => update
          .transition()
          .duration(1000)
          .attr("y", (d) => y(d.totalVente))
          .attr("height", (d) => y(0) - y(d.totalVente)),
        (exit) => exit
          .transition()
          .duration(1000)
          .attr("y", y(0))
          .attr("height", 0)
          .remove()
      );
  }
  
  

export function drawAxes(svg, x, y, width, height, xAxis) {
    svg.append("g").call(d3.axisLeft(y));
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");
  }
  
