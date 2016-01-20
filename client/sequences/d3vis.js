  Template.d3vis.created = function () {
    // Defer to make sure we manipulate DOM
    _.defer(function () {
      // Use this as a global variable 
      window.d3vis = {}
      Deps.autorun(function () {
        
        // On first run, set up the visualiation
        if (Deps.currentComputation.firstRun) {
          window.d3vis.margin = {top: 15, right: 5, bottom: 5, left: 5},
          window.d3vis.width = 600 - window.d3vis.margin.left - window.d3vis.margin.right,
          window.d3vis.height = 120 - window.d3vis.margin.top - window.d3vis.margin.bottom;

          window.d3vis.x = d3.scale.ordinal()
              .rangeRoundBands([0, window.d3vis.width], .1);

          window.d3vis.y = d3.scale.linear()
              .range([window.d3vis.height-2, 0]);

          window.d3vis.color = d3.scale.category10();

          window.d3vis.svg = d3.select('#d3vis')
              .attr("width", window.d3vis.width + window.d3vis.margin.left + window.d3vis.margin.right)
              .attr("height", window.d3vis.height + window.d3vis.margin.top + window.d3vis.margin.bottom)
            .append("g")
              .attr("class", "wrapper")
              .attr("transform", "translate(" + window.d3vis.margin.left + "," + window.d3vis.margin.top + ")");
        }

        // Get the colors based on the sorted names
        names = Sequences.find({}, {sort: {name: 1}}).fetch()
        window.d3vis.color.domain(names.map(function(d) { return d.name}));

        // Get the players
        players = Sequences.find({isActive: true}, {sort: {logsCount: -1, name: 1}}).fetch()
        window.d3vis.x.domain(players.map(function(d) { return d.name}));
        window.d3vis.y.domain([0, d3.max(players, function(d) {
          if (typeof d.logs !== 'undefined' && d.logs.length > 0) {
            return d.logs.length;
          }
         else {
            return 0;
          }
          }
         )]);

        // Two selectors (this could be streamlined...)
        var bar_selector = window.d3vis.svg.selectAll(".bar")
          .data(players, function (d) {return d.name})
        var yTextPadding = 20;

        var text_selector = window.d3vis.svg.selectAll(".bar_text")
          .data(players, function (d) {return d.name})

        bar_selector
          .enter().append("rect")
          .attr("class", "bar")
        bar_selector
          .transition()
          .duration(100)
          .attr("x", function(d) { return window.d3vis.x(d.name);})
          .attr("width", window.d3vis.x.rangeBand())
          .attr("y", function(d) { 
          if (typeof d.logs !== 'undefined' && d.logs.length > 0) {
            return window.d3vis.y(d.logs.length); 
          }
         else {
            return window.d3vis.y(0); 
          }
          })
          .attr("height", function(d) { 
          if (typeof d.logs !== 'undefined' && d.logs.length > 0) {
            return window.d3vis.height - window.d3vis.y(d.logs.length); 
          }
          else {
            return window.d3vis.height - window.d3vis.y(0); 
          }
          })
          .style("fill", function(d) { return window.d3vis.color(d.name);})

        text_selector
          .enter().append("text")
          .attr("class", "bar_text")
        text_selector
          .transition()
          .duration(100)
          .attr()
          .attr("x", function(d) { return window.d3vis.x(d.name) + 10;})
          .attr("y", function(d) { 
          if (typeof d.logs !== 'undefined' && d.logs.length > 0) {
            return window.d3vis.y(d.logs.length); 
          }
         else {
            return window.d3vis.y(0) - 2; 
          }
          })

          //label
          .text(function(d) {

          if (typeof d.logs !== 'undefined' && d.logs.length > 0) {
            return d.name + " - " + d.logsCount;
          }
          else{
            return d.name;
          }
          })
          .attr("height", function(d) { 
          if (typeof d.logs !== 'undefined' && d.logs.length > 0) {
            return window.d3vis.height - window.d3vis.y(d.logs.length); 
          }
         else {
            return window.d3vis.height - window.d3vis.y(0); 
          }
          })
      });
    });
  }