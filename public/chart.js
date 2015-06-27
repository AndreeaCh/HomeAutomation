    /*
    google.load("visualization", "1", {packages:["corechart"]});
    google.setOnLoadCallback(drawChart);

    function drawChart() {
    	var data = new google.visualization.DataTable();
        data.addColumn('date' ,'Date');
        data.addColumn('number' ,'Temperature');
        data.addRows(2);
        console.log('Error todos: ' + $http.todos);
        data.setCell(0,0, new Date(2015, 5, 1));
        data.setCell(0,1,'100');
        data.setCell(1,0, new Date(2015, 5, 5));
        data.setCell(1,1,'1000');
        .arrayToDataTable([
              ['Year', 'Sales'],
              ['2013',  1000]
        ]);

        var options = {
              title: 'Termperature',
              hAxis: {title: 'Date',  titleTextStyle: {color: '#333'}},
              vAxis: {title: 'Temperature', minValue: 0}
        };

        var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
           chart.draw(data, options);
        }*/