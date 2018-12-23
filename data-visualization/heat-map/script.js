'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // Canvas size
  const margin = {top: 100, left: 100, right: 20, bottom: 80};
  const w = 1132 - margin.left - margin.right;
  const h = 650 - margin.top - margin.bottom;
  const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

  // Get dataset via API
  const req = new XMLHttpRequest();
  req.open('GET', url, true);
  req.send();
  req.onload = function() {
    let data = JSON.parse(req.responseText);
    heatMap(data);
  }

  // Heat Map function
  function heatMap(dataset) {

    // Create the canvas
    const svg = d3.select(".chart")
      .append("svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // color quantile scale
    const colors = [
      "#5D2EE8", "#2F9EEE", "#2FC8EE", "#2DD91A", "#CBF22C",
      "#F2CE2C", "#F06E1D", "#E61717", "#3C2EA8", "#7A2EA1"
    ];
    const baseTemp = dataset.baseTemperature;
    const min = d3.min(dataset.monthlyVariance.map(d => d.variance));
    const maxV = d3.max(dataset.monthlyVariance.map(d => d.variance));
    const colorScale = d3.scaleQuantile()
      .domain([baseTemp + minV, baseTemp, baseTemp + maxV])
      .range(colors);

    // x axis
    const years = dataset.monthlyVariance.map(d => new Date(d.year}, 0, 1));
    const xMin = d3.min(years);
    const xMax = d3.max(years);
    const xScale = d3.scaleTime().domain([xMin, xMax]).range([0, w]);
    const xAxis = d3.axisBottom(xScale);
    svg.append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0, ${h})`)
      .call(xAxis);

    // y axis
    const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const yScale = d3.scaleBand().domain(months).range([0, h]);
    const yAxis = d3.axisLeft(yScale).tickFormat(d => monthNames[d]);
    svg.append("g")
      .attr("id", "y-axis")
      .call(yAxis);

    // chart title and axis labels
    svg.append("text")
      .attr("x", 20)
      .attr("y", -60)
      .attr("id", "title")
      .style("font-size", "24px")
      .text("Monthly Global Land-Surface Temperature");
    svg.append("text")
      .attr("x", 20)
      .attr("y", -30)
      .attr("id", "description")
      .style("font-size", "20px")
      .text("1753 - 2015: variances from base temperature 8.66℃");
    svg.append("text")
      .attr("x", -h/2 - 50)
      .attr("y", -60)
      .style("font-size", "18px")
      .attr("transform", "rotate(-90)")
      .text("Month");
    svg.append("text")
      .attr("x", w/2)
      .attr("y", h + 80)
      .style("font-size", "18px")
      .text("Year");

    // legend
    const colorAxis = d3.axisBottom(colorScale);
    const legend = svg.append("g")
      .attr("id","legend")
      .attr("transform","translate(600, 0)")
      .style("font-size","12px")
      .selectAll("rect")
      .data(colors)
      .enter();
    legend.append("rect")
      .attr("x", (d,i) => i*40)
      .attr("y", -60)
      .attr("width", 40)
      .attr("height", 20)
      .style("fill", (d,i) => d);
    legend.append("text")
      .data(colorScale.quantiles())
      .attr("x", (d,i) => 30 + i * 40)
      .attr("y", -30)
      .style("font-size", "10px")
      .text(d => d.toFixed(2)+"℃");

    // plot the heat map
    const barWidth = w / (dataset.monthlyVariance.length / 12);
    const barHeight = h / 12;
    const bars = svg.selectAll("rect")
      .data(dataset.monthlyVariance)
      .enter()
      .append("rect")
      .attr("class", "cell")
      .attr("data-year", d => d.year)
      .attr("data-month", d => d.month-1)
      .attr("data-temp", d => baseTemp + d.variance)
      .attr("x", (d,i) => barWidth * Math.floor(i/12))
      .attr("y", d => yScale(d.month-1))
      .attr("width", barWidth)
      .attr("height", barHeight)
      .style("fill", d => colorScale(baseTemp + d.variance));

      //tooltip
      bars.on("mouseover", function(d) {
        const xPos = parseFloat(d3.select(this).attr("x")) + 50;
        const yPos = parseFloat(d3.select(this).attr("y")) + 40;
        d3.select("#tooltip")
          .style("top", yPos + "px")
          .style("left", xPos + "px")
          .attr("data-year", d.year)
          .classed("hidden", false);

        d3.select("#tooltip-date")
          .text(`${monthNames[d.month-1]}, ${d.year}`);

        d3.select("#tooltip-value")
          .text(`${(baseTemp + d.variance).toFixed(2)}℃  ${d.variance.toFixed(2)}℃`);
      });

      bars.on("mouseout", function(d) {
        d3.select("#tooltip")
          .classed("hidden", true);
      })
  }

});
