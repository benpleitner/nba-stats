d3.csv("../data/data.csv", function(error, data) {
  console.log(data);

  var graph_data = [],
  		date_min = 2016,
  		date_max = 0,
  		num_players = data.length,
  		points_per_game_num = 0,
  		assists_per_game_num = 0,
  		rebounds_per_game_num = 0,
  		years_num = 0,
  		decade = 0;

  for (var i = 0; i < data.length; i++) {
  	// console.log(data[i]);
  	if (data[i].From < date_min) {
  		date_min = data[i].From;
  	}

  	if (data[i].To > date_max) {
  		date_max = data[i].To;
  	}

  	//Assign points per game number
  	if (data[i].PTS < 5) {
  		points_per_game_num = 0;
  	} else if (data[i].PTS < 10) {
  		points_per_game_num = 1;
  	} else if (data[i].PTS < 15) {
  		points_per_game_num = 2;
  	} else if (data[i].PTS < 20) {
  		points_per_game_num = 3;
  	} else if (data[i].PTS < 30) {
  		points_per_game_num = 4;
  	} else {
  		points_per_game_num = 5;
  	}

  	//Assign assists per game number
  	if (data[i].AST < 2) {
  		assists_per_game_num = 0;
  	} else if (data[i].AST < 4) {
  		assists_per_game_num = 1;
  	} else if (data[i].AST < 6) {
  		assists_per_game_num = 2;
  	} else if (data[i].AST < 8) {
  		assists_per_game_num = 3;
  	} else if (data[i].AST < 10) {
  		assists_per_game_num = 4;
  	} else {
  		assists_per_game_num = 5;
  	}

  	//Assign rebounds per game number
  	if (data[i].TRB < 2) {
  		rebounds_per_game_num = 0;
  	} else if (data[i].TRB < 4) {
  		rebounds_per_game_num = 1;
  	} else if (data[i].TRB < 6) {
  		rebounds_per_game_num = 2;
  	} else if (data[i].TRB < 8) {
  		rebounds_per_game_num = 3;
  	} else if (data[i].TRB < 10) {
  		rebounds_per_game_num = 4;
  	} else {
  		rebounds_per_game_num = 5;
  	}

  	//Assign total games number
  	if (data[i].Yrs = 1) {
  		years_num = 0;
  	} else if (data[i].Yrs = 2) {
  		years_num = 1;
  	} else if (data[i].Yrs < 5) {
  		years_num = 2;
  	} else if (data[i].Yrs < 8) {
  		years_num = 3;
  	} else if (data[i].Yrs < 10) {
  		years_num = 4;
  	} else {
  		years_num = 5;
  	}

  	if (data[i].STL === "") {
  		data[i].STL = "No data";
  	}

  	if (data[i].BLK === "") {
  		data[i].BLK = "No data";
  	}

  	if (data[i].MP === "") {
  		data[i].MP = "No data";
  	}

  	if (data[i].TRB === "") {
  		data[i].TRB = "No data";
  	}

  	graph_data.push({
  		name: data[i].Player,
  		first_name: data[i].Player.split(" ")[0],
  		last_name: data[i].Player.split(" ")[1],
  		games: data[i].G,
  		minutes_per_game: data[i].MP,
  		points_per_game: data[i].PTS,
  		points_per_game_num: points_per_game_num,
  		assists_per_game_num: assists_per_game_num,
  		rebounds_per_game_num: rebounds_per_game_num,
  		years_num: years_num,
  		assists_per_game: data[i].AST,
  		rebounds_per_game: data[i].TRB,
  		steals: data[i].STL,
  		blocks: data[i].BLK,
  		shooting_percentage: data[i]["FG%"] * 100,
  		freethrow_percentage: data[i]["FT%"] * 100,
  		three_percentage: data[i]["3P%"] * 100,
  		total_threes: data[i]["3P"],
  		from: data[i].From,
  		to: data[i].To,
  		years: data[i].Yrs
  	});
  }

  //Write to the HTML page
  $("#from").text(date_min);
  $("#to").text(date_max);
  $("#num_players").text(num_players);

	var ndx = crossfilter(graph_data); //Prepare the data to be crossfiltered
	
	makeDataTable(graph_data, ndx);
	makePPGRowChart(graph_data, ndx);
	makeAPGRowChart(graph_data, ndx);
	makeRPGRowChart(graph_data, ndx);

	function makeDataTable(graph_data, ndx) {
    var coursesInfo = ndx.dimension(function(d) {
      return d.course;
    });

    //Data table
    dataTable = dc.dataTable("#dataTable")

    dataTable
        .dimension(coursesInfo)
        .group(function(d) {
            return "";
        })
        .size([Infinity])
        .columns([
          function(d) {
          	return d.name;
          },
          function(d) {
          	return d.from;
          },
          function(d) {
          	return d.to;
          },
          function(d) {
          	return d.years;
          },
          function(d) {
          	return d.games;
          },
          function(d) {
          	return d.minutes_per_game;
          },
          function(d) {
          	return d.points_per_game;
          },
          function(d) {
          	return d.assists_per_game;
          },
          function(d) {
          	return d.rebounds_per_game;
          },
          function(d) {
          	return d.steals;
          },
          function(d) {
          	return d.blocks;
          },
          function(d) {
          	return d.shooting_percentage.toFixed(1);
          },
          function(d) {
          	return d.freethrow_percentage.toFixed(1);
          },
          function(d) {
          	return d.three_percentage.toFixed(1);
          }

          //TODO: Add total threes, points, assists, and rebounds
        ])
        .sortBy(function (d) {
          return d.last_name;
        })
        .order(d3.ascending);

    dc.renderAll();
    // spinner.stop();
    $(".container").css("display", "inherit");
	}
});

function makePPGRowChart(graph_data, ndx) {
  var ppg = ndx.dimension(function(d) {
    return d.points_per_game_num;
  });

  var ppgGroup = ppg.group().reduceSum(function(d) {
    return 1;
  });

  rowChart = dc.rowChart("#points_per_game_row_chart");

  rowChart.width(350)
        .height(350)
        .margins({top: 100, right: 10, bottom: 30, left: 10})
        .dimension(ppg)
        .group(ppgGroup)
        .elasticX(true)
        .gap(1)
        .x(d3.scale.linear().domain([-1, 8]))
        .label(function(d) {
          var num = d.key;
          switch (num) {
          	case 0:
          		return "0.0 - 4.9";
            case 1:
              return "5.0 - 9.9";
            case 2:
            	return "10.0 - 14.9";
            case 3:
            	return "15.0 - 19.9";
            case 4:
            	return "20.0 - 29.9";
            default:
            	return "30+";
          }
        })
        .transitionDuration(700);

  dc.renderAll();
};

function makeAPGRowChart(graph_data, ndx) {
  var apg = ndx.dimension(function(d) {
    return d.assists_per_game_num;
  });

  var apgGroup = apg.group().reduceSum(function(d) {
    return 1;
  });

  rowChart = dc.rowChart("#assists_per_game_row_chart");

  rowChart.width(350)
        .height(350)
        .margins({top: 100, right: 10, bottom: 30, left: 10})
        .dimension(apg)
        .group(apgGroup)
        .elasticX(true)
        .gap(1)
        .x(d3.scale.linear().domain([-1, 8]))
        .label(function(d) {
          var num = d.key;
          switch (num) {
          	case 0:
          		return "0.0 - 1.9";
            case 1:
              return "2.0 - 3.9";
            case 2:
            	return "4.0 - 5.9";
            case 3:
            	return "6.0 - 7.9";
            case 4:
            	return "8.0 - 9.9";
            default:
            	return "10+";
          }
        })
        .transitionDuration(700);

  dc.renderAll();
};

function makeRPGRowChart(graph_data, ndx) {
  var rpg = ndx.dimension(function(d) {
    return d.rebounds_per_game_num;
  });

  var rpgGroup = rpg.group().reduceSum(function(d) {
    return 1;
  });

  rowChart = dc.rowChart("#rebounds_per_game_row_chart");

  rowChart.width(350)
        .height(350)
        .margins({top: 100, right: 10, bottom: 30, left: 10})
        .dimension(rpg)
        .group(rpgGroup)
        .elasticX(true)
        .gap(1)
        .x(d3.scale.linear().domain([-1, 8]))
        .label(function(d) {
          var num = d.key;
          switch (num) {
          	case 0:
          		return "0.0 - 1.9";
            case 1:
              return "2.0 - 3.9";
            case 2:
            	return "4.0 - 5.9";
            case 3:
            	return "6.0 - 7.9";
            case 4:
            	return "8.0 - 9.9";
            default:
            	return "10+";
          }
        })
        .transitionDuration(700);

  dc.renderAll();
};

//Helper function that adds an x-axis label to the row chart
function addXAxis(chartToUpdate, displayText) {
  chartToUpdate.svg()
      .append("text")
      .attr("class", "x-axis-label")
      .attr("text-anchor", "middle")
      .attr("x", chartToUpdate.width() / 2)
      .attr("y", chartToUpdate.height())
      .text(displayText);
}