'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // Canvas size
  const margin = {top: 100, left: 50, right: 20, bottom: 20};
  const w = 1400 - margin.left - margin.right;
  const h = 750 - margin.top - margin.bottom;
  const eduURL = "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json"
  const mapURL = "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json";

  const colors = ["#dfffff", "#bFDFFF", "#80BFFF", "409FFF", "#0080FF", "#0060BF", "#000080", "#002040"];

  // Create the canvas
  const svg = d3.select(".chart")
    .append("svg")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // chart title and axis labels
  svg.append("text")
    .attr("x", w/5)
    .attr("y", -60)
    .attr("id", "title")
    .style("font-size", "30px")
    .text("United States Educational Attainment");
  svg.append("text")
    .attr("x", w/5.3)
    .attr("y", -30)
    .attr("id", "description")
    .style("font-size", "16px")
    .text("Percentage of adults > age 25 with a bachelor's degree or higher (2010-2014)");
  svg.append("svg:a")
    .attr("xlink:href", "https://www.ers.usda.gov/data-products/county-level-data-sets/download-data.aspx")
    .append("text")
    .attr("x", 650)
    .attr("y", h)
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text("Source: USDA Economic Research Service");

  let projection = d3.geoAlbers()
      .scale([w])
      .translate([(w + margin.left + margin.right)/2, (h + margin.top + margin.bottom)/2]);

  let path = d3.geoPath()
      .projection(projection);

  // Get topoJSON via API
  let req = new XMLHttpRequest();
  req.open('GET', mapURL, true);
  req.send();
  req.onload = function() {
    let topoData = JSON.parse(req.responseText);
    
    // get Education data
    req = new XMLHttpRequest();
    req.open('GET', eduURL, true);
    req.send();
    req.onload = function() {
      const eduData = JSON.parse(req.responseText);
      const geoJson = topojson.feature(topoData, topoData.objects.counties).features;
      // merge education data into topodata
      const combinedData = [];
      for (let i=0; i<geoJson.length; i++) {
        for (let j=0; j<eduData.length; j++) {
          if (geoJson[i].id === eduData[j].fips) {
            combinedData.push(Object.assign({}, geoJson[i], eduData[j]));
          }
        }
      }
      choropleth(topoData, combinedData);
    }
  }

  // choropleth map function
  function choropleth(dataset, countyData) {

      // color scale
      const color = d3.scaleQuantize().range(colors);
      const lowPct = d3.min(countyData.map(d => d.bachelorsOrHigher));
      const highPct = d3.max(countyData.map(d => d.bachelorsOrHigher));
      const colorScale = d3.scaleQuantile()
        .domain([lowPct, 50, highPct])
        .range(colors);

      // county map
      const mapObj = svg.selectAll("path")
       .data(countyData)
       .enter()
       .append("path")
       .attr("d", d3.geoPath())
       .attr("class", "county")
       .attr("data-fips", d => d.fips)
       .attr("data-education", d => d.bachelorsOrHigher)
       .style("fill", d => colorScale(d.bachelorsOrHigher));

      // state borders
      svg.append("path")
         .datum(topojson.mesh(dataset, dataset.objects.states, (a, b) => a !== b))
         .attr("fill", "none")
         .attr("stroke", "white")
         .attr("stroke-linejoin", "round")
         .attr("d", d3.geoPath());

      // legend
      const colorAxis = d3.axisBottom(colorScale);
      const legend = svg.append("g")
      .attr("id","legend")
      .attr("transform","translate(570, 0)")
      .style("font-size","12px")
      .selectAll("rect")
      .data(colors)
      .enter();
      legend.append("rect")
      .attr("x", (d,i) => i*40)
      .attr("y", 10)
      .attr("width", 40)
      .attr("height", 20)
      .style("fill", (d,i) => d);
      legend.append("text")
      .data(colorScale.quantiles())
      .attr("x", (d,i) => 30 + i * 40)
      .attr("y", 40)
      .style("font-size", "10px")
      .text(d => `${d.toFixed(0)}%`);

      //tooltip
      mapObj.on("mouseover", function(d) {
        d3.select("#tooltip")
          .style("left", `${d3.event.clientX + 2}px`)
          .style("top", `${d3.event.clientY - 35}px`)
          .attr("data-education", d.bachelorsOrHigher)
          .classed("hidden", false);

        d3.select("#tooltip-data")
          .text(`${d.area_name}, ${d.state}: ${d.bachelorsOrHigher}%`);
      });

      mapObj.on("mouseout", function(d) {
        d3.select("#tooltip")
          .classed("hidden", true);
      });
  }

});
