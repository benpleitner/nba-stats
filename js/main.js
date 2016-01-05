console.log("TEAM: " + amplify.store("team") + " DATA: " + amplify.store("team_data"));

$("#team_name_title").text(amplify.store("team") + " Player Data");
$("title").text(amplify.store("team"));

//Start the spinner and hide the content
var opts = {
  lines: 13, // The number of lines to draw
  length: 20, // The length of each line
  width: 10, // The line thickness
  radius: 30, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#03b7f9', // #rgb or #rrggbb or array of colors
  speed: 1, // Rounds per second
  trail: 60, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: '50%', // Top position relative to parent
  left: '50%' // Left position relative to parent
};

$(".container").css("display", "none");

var target = document.getElementById("spin");
var spinner = new Spinner(opts).spin(target);

d3.csv("data/" + amplify.store("team_data"), function(error, data) {
  console.log(data);

  var graph_data = [],
  		date_min = 2016,
  		date_max = 0,
  		num_players = data.length,
  		points_per_game_num = 0,
  		assists_per_game_num = 0,
  		rebounds_per_game_num = 0,
  		years_num = 0,
      fgp_num = 0,
      ftp_num = 0,
  		decade = 0;

  for (var i = 0; i < data.length; i++) {
  	// console.log(data[i]);
  	if (data[i].From < date_min && data[i].From != "") {
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
  	if (data[i].Yrs == 1) {
  		years_num = 0;
  	} else if (data[i].Yrs == 2) {
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

    //Assign a FG% number
    if (data[i]["FG%"] * 100 < 30) {
      fgp_num = 0;
    } else if(data[i]["FG%"] * 100 < 35) {
      fgp_num = 1;
    } else if (data[i]["FG%"] * 100 < 40) {
      fgp_num = 2;
    } else if (data[i]["FG%"] * 100 < 45) {
      fgp_num = 3;
    } else if (data[i]["FG%"] * 100 < 50) {
      fgp_num = 4;
    } else {
      fgp_num = 5;
    }

    //Assign a FT% number
    if (data[i]["FT%"] * 100 < 50) {
      ftp_num = 0;
    } else if (data[i]["FT%"] * 100 < 60) {
      ftp_num = 1;
    } else if (data[i]["FT%"] * 100 < 70) {
      ftp_num = 2;
    } else if (data[i]["FT%"] * 100 < 80) {
      ftp_num = 3;
    } else if (data[i]["FT%"] * 100 < 90) {
      ftp_num = 4;
    } else {
      ftp_num = 5;
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
      fgp_num: fgp_num,
      ftp_num: ftp_num,
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
  makeYearsChart(graph_data, ndx);
  makeFGPChart(graph_data, ndx);
  makeFTPChart(graph_data, ndx);

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

  spinner.stop();
  $(".container").css("display", "inherit");
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

function makeYearsChart(graph_data, ndx) {
  var years = ndx.dimension(function(d) {
    return d.years_num;
  });

  var yearsGroup = years.group().reduceSum(function(d) {
    return 1;
  });

  rowChart = dc.rowChart("#years_chart");

  rowChart.width(350)
        .height(350)
        .margins({top: 100, right: 10, bottom: 30, left: 10})
        .dimension(years)
        .group(yearsGroup)
        .elasticX(true)
        .gap(1)
        .x(d3.scale.linear().domain([-1, 8]))
        .label(function(d) {
          var num = d.key;
          switch (num) {
            case 0:
              return "1";
            case 1:
              return "2";
            case 2:
              return "3 - 4";
            case 3:
              return "5 - 7";
            case 4:
              return "8 - 9";
            default:
              return "10+";
          }
        })
        .transitionDuration(700);

  dc.renderAll();
};

function makeFGPChart(graph_data, ndx) {
  var fgp = ndx.dimension(function(d) {
    return d.fgp_num;
  });

  var fgpGroup = fgp.group().reduceSum(function(d) {
    return 1;
  });

  rowChart = dc.rowChart("#fg_percentage_chart");

  rowChart.width(350)
        .height(350)
        .margins({top: 100, right: 10, bottom: 30, left: 10})
        .dimension(fgp)
        .group(fgpGroup)
        .elasticX(true)
        .gap(1)
        .x(d3.scale.linear().domain([-1, 8]))
        .label(function(d) {
          var num = d.key;
          switch (num) {
            case 0:
              return "0 - 29.9";
            case 1:
              return "30 - 34.9";
            case 2:
              return "35 - 39.9";
            case 3:
              return "40 - 44.9";
            case 4:
              return "45 - 49.9";
            default:
              return "50+";
          }
        })
        .transitionDuration(700);

  dc.renderAll();
};

function makeFTPChart(graph_data, ndx) {
  var ftp = ndx.dimension(function(d) {
    return d.ftp_num;
  });

  var ftpGroup = ftp.group().reduceSum(function(d) {
    return 1;
  });

  rowChart = dc.rowChart("#ft_percentage_chart");

  rowChart.width(350)
        .height(350)
        .margins({top: 100, right: 10, bottom: 30, left: 10})
        .dimension(ftp)
        .group(ftpGroup)
        .elasticX(true)
        .gap(1)
        .x(d3.scale.linear().domain([-1, 8]))
        .label(function(d) {
          var num = d.key;
          switch (num) {
            case 0:
              return "0 - 49.9";
            case 1:
              return "50 - 59.9";
            case 2:
              return "60 - 69.9";
            case 3:
              return "70 - 79.9";
            case 4:
              return "80 - 89.9";
            default:
              return "90+";
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