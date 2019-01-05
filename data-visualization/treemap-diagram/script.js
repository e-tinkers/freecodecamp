"use strict";

document.addEventListener("DOMContentLoaded", () => {

  // Canvas size
  const margin = {top: 40, left: 40, right: 40, bottom: 100};
  const w = 1200 - margin.left - margin.right;
  const h = 650 - margin.top - margin.bottom;

  document.forms.dataSelection.addEventListener("change", fetchData);
  fetchData();

  function fetchData(e) {
    let url = "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/";
    const datasetMeta = [
      {
        title: "Video Game Sales",
        description: "Top 100 Most Sold Video Games Grouped by Platform",
        file: "video-game-sales-data.json"
      },
      {
        title: "Movie Sales",
        description: "Top 100 Highest Grossing Movies Grouped By Genre",
        file: "movie-data.json"
      },
      {
        title: "Kickstarter Pledges",
        description: "Top 100 Most Pledged Kickstarter Campaigns Grouped By Category",
        file: "kickstarter-funding-data.json"
      }
    ];

    // handle user select on dataset
    if (e === undefined) {    // initial load of data, not through event trigger
      url = url + datasetMeta[0].file;
    } else if(e.target.name === "radios") {
      url = url + datasetMeta[e.target.value].file;
      document.getElementById("title").textContent = datasetMeta[e.target.value].title;
      document.getElementById("description").textContent = datasetMeta[e.target.value].description;
    }

    // Get dataset via API
      const req = new XMLHttpRequest();
      req.open("GET", url, true);
      req.send();
      req.onload = function() {
        document.getElementById("chart").innerHTML="";
        let data = JSON.parse(req.responseText);
        treemap(data);
      }
  };

  // Modified from https://bl.ocks.org/mbostock/7555321
  function wrap(text) {
  text.each(function() {
    const text = d3.select(this);
    const words = text.text().split(/[\s+/]/).reverse();
    // get rect boundingBox size, rect is the sibling of text
    const rectBounding = text.node().parentNode.children[0].getBBox();
    const x = 4;
    const y = 14;
    const lineHeight = 10;

    let word;
    let line = [];
    let lineNumber = 0;
    let tspan = text.text(null).append("tspan").attr("x", x).attr("y", y);

    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      // if the line is too long, add another line
      if (tspan.node().getComputedTextLength() > rectBounding.width - x) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        lineNumber++;
        // if number of lines not exceed the height
        if (lineNumber * lineHeight < rectBounding.height - y) {
          tspan = text.append("tspan").attr("x", x).attr("y", y + lineNumber * lineHeight).text(word);
        }
      }
    }
  });
}

  function treemap(dataset) {

    // Create the canvas
    const svg = d3.select("svg")
      .attr("width", w + margin.left + margin.right)
      .attr("height", h + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Build data hierarchy and sort by category
    const root = d3.hierarchy(dataset)
      .sum(d => d.value)
      .sort((a,b) => b.value - a.value);

    // color scale
    const categories = root.children.map(d => d.data.name);
    const colorScale = d3.scaleOrdinal().domain(categories).range(d3.schemeSet2);

    // set treemap layout
    const treemapLayout = d3.treemap()
      .size([w, h])
      .paddingInner(1);

    treemapLayout(root);

    // plot the treemap
    const nodes = d3.select("svg g")
      .selectAll("rect")
      .data(root.leaves())
      .enter()
      .append("g")
      .attr("transform", d => "translate(" + [d.x0, d.y0] + ")");
    nodes.append("rect")
      .attr("class", "tile")
      .attr("data-name", d => d.data.name)
      .attr("data-category", d => d.data.category)
      .attr("data-value", d => d.data.value)
      .attr("width", d => d.x1 - d.x0)
      .attr("height", d => d.y1 - d.y0)
      .style("stroke", "#ffffff")
      .style("fill", d => colorScale(d.data.category));
    nodes.append("text")
      .style("font-size", "10px")
      .text(d => d.data.name)
      .call(wrap);

    //tooltip
    nodes.on("mouseover", function(d) {
      d3.select("#tooltip")
        .style("left", `${d3.event.pageX + 20}px`)
        .style("top", `${d3.event.pageY - 30}px`)
        .attr("data-value", d.data.value)
        .classed("hidden", false)
      d3.select("#tooltip-data")
        .html(`Name: ${d.data.name}<br>Category: ${d.data.category}, Value: $${d.data.value}`);
    });
    nodes.on("mouseout", function(d) {
      d3.select("#tooltip")
        .classed("hidden", true);
    });

    // legend
    const legend = svg.append("g")
      .attr("id","legend")
      .attr("transform",`translate(0, ${h})`)
      .style("font-size","12px")
      .selectAll("rect")
      .data(categories)
      .enter();
    legend.append("rect")
      .attr("class", "legend-item")
      .attr("x", (d, i) => i < 10 ? i * 110 : (i-10) * 110)
      .attr("y", (d,i) => i < 10 ? 20 : 50)
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", d => colorScale(d));
    legend.append("text")
      .attr("x", (d, i) => i < 10 ? 15 + i * 110: 15 + (i-10) * 110)
      .attr("y", (d, i) => i < 10 ? 30 : 60)
      .text(d => d);
  }


});
