'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // Canvas size
  const margin = {top: 20, left: 50, right: 20, bottom: 60};
  const w = 960 - margin.left - margin.right;
  const h = 600 - margin.top - margin.bottom;
  const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

  // Get dataset via API
  const req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.send();
  req.onload = function() {
    var data = JSON.parse(req.responseText);
    scatterPlot(data);
  }

  function scatterPlot(dataset) {
    // Create the canvas
    const svg = d3.select(".chart")
      .append("svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // x and y axises
    const dateInfo = dataset.map(d => new Date(`${d.Year}-01-01`));
    let xMin = d3.min(dateInfo);
    xMin = new Date(`${xMin.getFullYear() - 1}-01-01`);
    let xMax = d3.max(dateInfo);
    xMax = new Date(`${xMax.getFullYear() + 1}-01-01`);
    const xScale = d3.scaleTime().domain([xMin, xMax]).range([0, w]);
    const xAxis = d3.axisBottom(xScale);

    const timeInfo = dataset.map(d => new Date(d.Seconds*1000));
    const yMin = d3.min(timeInfo);
    const yMax = d3.max(timeInfo);
    const yScale = d3.scaleTime().domain([yMin, yMax]).range([0, h]);
    const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));

    svg.append("g")
      .attr("id", "x-axis")
      .attr("transform", "translate(0,"+ h +")")
      .call(xAxis);
    svg.append("g")
      .attr("id", "y-axis")
      .call(yAxis);

    // legend
    const legends = [
      {"x": 10, "y": 10, "color": "red", "legend": "With doping allegatons"},
      {"x": 10, "y": 33, "color": "#00ffcc", "legend": "No doping allegations"}
    ];
    const legend = svg.append("g")
      .attr("id","legend")
      .attr("transform","translate(760,100)")
      .style("font-size","12px")
      .selectAll("circle")
      .data(legends)
      .enter();
    legend.append("rect")
      .attr("x", -10)
      .attr("y", -10)
      .attr("width", 140)
      .attr("height", 60)
      .style("stroke", "navy")
      .style("fill", "transparent")
    legend.append("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", 6)
      .style("fill", d => d.color);
    legend.append("text")
      .attr("x", d => d.x + 10)
      .attr("y", d => d.y + 3)
      .text(d => d.legend);

    // chart title
    svg.append("text")
      .attr("x", w * 0.32)
      .attr("y", 40)
      .attr("id", "title")
      .text("Doping in Professional Bicycle Racing");
    svg.append("text")
      .attr("x", -200)
      .attr("y", 20)
      .style("font-size", 14 + "px")
      .attr("transform", "rotate(-90)")
      .text("Time in Minutes");

      // plot the bar chart
      const dotSize = 6;
      const dots = svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("data-xvalue", d => new Date(`${d.Year}-01-01`).getFullYear())
        .attr("data-yvalue", d => new Date(d.Seconds * 1000).toISOString())
        .attr("cx", d => xScale(new Date(`${d.Year}-01-01`)))
        .attr("cy", d => yScale(new Date(d.Seconds * 1000)))
        .attr("r", dotSize)
        .style("fill", d => d.Doping!=""? "red" : "#00ffcc");

      dots.on("mouseover", function(d) {
        const xPos = parseFloat(d3.select(this).attr("cx")) + margin.left + margin.right;
        const yPos = (parseFloat(d3.select(this).attr("cy")) - margin.top);

        d3.select("#tooltip")
          .style("top", yPos + "px")
          .style("left", xPos + "px")
          .attr("data-year", d3.select(this).attr("data-xvalue"))
          .classed("hidden", false);

        d3.select("#tooltip-bio")
          .text(`${d.Name}: ${d.Nationality} Year:${d.Year}, Time:${d.Time}`);

        d3.select("#tooltip-allegation")
          .text(`${d.Doping}`);
      });

      dots.on("mouseout", function(d) {
        d3.select("#tooltip")
          .classed("hidden", true);
      })
  }

});
