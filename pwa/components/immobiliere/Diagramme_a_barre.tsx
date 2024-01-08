import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { processPeriodData, setupScales, setupChart, updateBars, drawAxes } from './chartUtils';

interface BarChartProps {
  data: { date: string; totalVente: number }[];
  periode: string;
}

export const BarChart: React.FC<BarChartProps> = ({ data, periode }) => {
  const container = useRef(null); 
  const tooltip = useRef(null); 

  useEffect(() => {
    if (data && container.current) {
      const margin = { top: 30, right: 30, bottom: 100, left: 60 },
        width = 800 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

      d3.select(container.current).selectAll("svg").remove();
      const svg = setupChart(container.current, width, height, margin); 
      const aggregatedData = processPeriodData(data, periode);
      const [x, y, xAxis] = setupScales(aggregatedData, width, height, periode);

      drawAxes(svg, x, y, width, height, xAxis); 
      updateBars(svg, x, y, aggregatedData, periode, tooltip); 
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
          #div_customContent {
            position: absolute;
            visibility: hidden;
            background-color: white;
            border: solid 1px;
            border-radius: 5px;
            padding: 10px;
          }
          
        `}
      </style>
      <div className="chart-container">
        <h1 className="title">Diagramme à barre</h1>
        <div ref={container} style={{ display: 'flex', justifyContent: 'center', alignItems: "center" }} ></div>
        <div id="div_customContent"></div> 
      </div>
    </>
  );
};
