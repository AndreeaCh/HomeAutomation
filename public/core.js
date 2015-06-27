// public/core.js
var scotchTodo = angular.module('scotchTodo', []);
var tableData;
google.load("visualization", "1", {packages:["corechart"]});

function mainController($scope, $http) {
    $scope.formData = {};

   /* // when landing on the page, get all todos and show them
    $http.get('/api/todos')
        .success(function(data) {
            $scope.todos = data;
            console.log("Read data: "+data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready
                					  // to enter another
                $scope.todos = data;
                console.log("Created data: "+data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log("Deleting data: "+data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };*/
    
    $scope.init = function() { 
    	$http.get('/api/todos')
        .success(function(data) {
        	tableData=data;
            console.log("Read data: "+data);
            drawTemperatureChart();
            drawLuminosityChart();
            drawHumidityChart();
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };
}

function drawTemperatureChart() {
	var data = new google.visualization.DataTable();
    data.addColumn('datetime' ,'Date');
    data.addColumn('number' ,'Temperature');
    data.addRows(tableData.length);
    console.log(tableData);
    var i=0;
    tableData.forEach(function(entry) {
    	  var offset = -3;
    	  data.setCell(i,0,new Date(Date.parse(entry.time) + offset * 3600 * 1000));
    	  data.setCell(i,1, entry.temperature);
    	  i++;
    });
    var diff = 5;
    var now = new Date();
    var minDate = new Date(now.getTime() - diff*60000);
    var maxDate = new Date(now.getTime() + diff*60000);
    var options = {
          title: 'Temperature',
          hAxis: {title: 'Date',  titleTextStyle: {color: '#333'}},
          vAxis: {title: 'Temperature', titleTextStyle: {color: '#333'}, minValue: 15, maxValue: 25}
    };

    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
       chart.draw(data, options);
    }

function drawLuminosityChart() {
	var data = new google.visualization.DataTable();
    data.addColumn('datetime' ,'Date');
    data.addColumn('number' ,'Luminosity');
    data.addRows(tableData.length);
    console.log(tableData);
    var i=0;
    tableData.forEach(function(entry) {
    	  var offset = -3;
    	  data.setCell(i,0,new Date(Date.parse(entry.time) + offset * 3600 * 1000));
    	  data.setCell(i,1, entry.luminosity);
    	  i++;
    });
    var options = {
          title: 'Luminosity',
          curveType: 'function',
          hAxis: {title: 'Date',  titleTextStyle: {color: '#333'}},
          vAxis: {title: 'Luminosity', titleTextStyle: {color: '#333'}}
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    chart.draw(data, options);
}


function drawHumidityChart() {
	var data = new google.visualization.DataTable();
    data.addColumn('datetime' ,'Date');
    data.addColumn('number' ,'Humidity');
    data.addRows(tableData.length);
    console.log(tableData);
    var i=0;
    tableData.forEach(function(entry) {
    	  var offset = -3;
    	  data.setCell(i,0,new Date(Date.parse(entry.time) + offset * 3600 * 1000));
    	  data.setCell(i,1, entry.humidity);
    	  i++;
    });
    var options = {
          title: 'Humidity',
          curveType: 'function',
          hAxis: {title: 'Date',  titleTextStyle: {color: '#333'}},
          vAxis: {title: 'Humidity', titleTextStyle: {color: '#333'}}
    };

    var chart = new google.visualization.LineChart(document.getElementById('humidity_chart'));
    chart.draw(data, options);
}