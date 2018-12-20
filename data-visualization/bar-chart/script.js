'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // Canvas size
  const margin = {top: 20, left: 50, right: 20, bottom: 60};
  const w = 960 - margin.left - margin.right;
  const h = 500 - margin.top - margin.bottom;
  const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

  // Get dataset via API
  const req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.send();
  req.onload = function(dataset) {
    var data = JSON.parse(req.responseText).data;
    barChart(data);
  }

  // Bar Chart function called by the ajax callback
  function barChart(dataset) {

    // Create the canvas
    const svg = d3.select(".bar-chart")
      .append("svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // x and y axises
    const dateInfo = dataset.map(d => new Date(d[0]));
    const xMin = d3.min(dateInfo);
    const xMax = d3.max(dateInfo);
    xMax.setMonth(xMax.getMonth() + 3);
    const xScale = d3.scaleTime().domain([xMin, xMax]).range([0, w]);
    const xAxis = d3.axisBottom(xScale);

    const yMax = d3.max(dataset, d => d[1]);
    const yScale = d3.scaleLinear().domain([0, yMax]).range([h, 0]);
    const yAxis = d3.axisLeft(yScale);
    svg.append("g")
      .attr("id", "x-axis")
      .attr("transform", "translate(0,"+ h +")")
      .call(xAxis);
    svg.append("g")
      .attr("id", "y-axis")
      .call(yAxis);

    // chart title
    svg.append("text")
      .attr("x", w * 0.32)
      .attr("y", 40)
      .attr("id", "title")
      .text("United States GDP (1947 - 2015)");
    svg.append("text")
      .attr("x", -300)
      .attr("y", 20)
      .style("font-size", 14 + "px")
      .attr("transform", "rotate(-90)")
      .text("Gross Domestic Product ($ Billions)");
    svg.append("text")
      .attr("x", w * 0.58)
      .attr("y", h + 40)
      .style("font-size", 14 + "px")
      .text("More Information: http://www.bea.gov/national/pdf/nipaguid.pdf");

    // plot the bar chart
    const barWidth = w / dataset.length;
    const bars = svg.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("data-date", d => d[0])
      .attr("data-gdp", d => d[1])
      .attr("x", (d,i) => barWidth * i)
      .attr("y", d => yScale(d[1]))
      .attr("width", barWidth)
      .attr("height", d => h - yScale(d[1]));

    // tooltip
    bars.on("mouseover", function(d) {
      const xPos = parseFloat(d3.select(this).attr("x")) + margin.left + margin.right;
      const yPos = (parseFloat(d3.select(this).attr("y")) + h - margin.top) / 2;
      const toQuarter = function(d) {
        let y = parseInt(d.split("-")[0], 10);
        let q = Math.floor(parseInt(d.split("-")[1], 10) / 3) + 1;
        return `${y} Q${q}`;
      }
      d3.select("#tooltip")
        .style("top", yPos + "px")
        .style("left", xPos + "px")
        .attr("data-date", d[0])
        .classed("hidden", false);

      d3.select("#tooltip-date")
        .text(toQuarter(d[0]));

      d3.select("#tooltip-value")
        .text(` $${d[1]} Billions`);
    });

    bars.on("mouseout", function(d) {
      d3.select("#tooltip")
        .classed("hidden", true);
    })

  }
});
