import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';

const Home = () => {
  const [time, setTime] = useState([]);
  const [year, setYear] = useState([]);
  const d3Container = useRef(null);
  const w = 1000;
  const h = 400;

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json");
      const data = await response.json();
      setTime(data.map((d) => d.Seconds));
      setYear(data.map((d) => d.Year));
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (time.length > 0 && year.length > 0) {
      const dataset = time.map((t, i) => [t, year[i]]);

      const container = d3.select(d3Container.current);
      container.selectAll('svg').remove();
      
      const svg = container.append("svg")
        .attr("width", w)
        .attr("height", h);

      // Scaling functions
      const xScale = d3.scaleLinear()
        .domain([d3.min(dataset, d => d[1]), d3.max(dataset, d => d[1])])
        .range([50, w - 50]);

      const yScale = d3.scaleLinear()
        .domain([d3.min(dataset, d => d[0]), d3.max(dataset, d => d[0])])
        .range([50, h - 50]); // Invert the y-axis by reversing the range

      svg.selectAll("circle")
        .data(dataset).enter().append("circle")
        .attr("cx", d => xScale(d[1]))
        .attr("cy", d => yScale(d[0]))
        .attr("r", 5)
        .attr("fill", "blue");
    }
  }, [time, year]);

  return (
    <div ref={d3Container}>
<h1 style={{textAlign: "center"}}>Doping in Professional Bicycle Racing</h1>
<h2 style={{textAlign: "center"}}>35 Fastest times up Alpe d'Huez</h2>


    </div>
  );
}

export default Home;
