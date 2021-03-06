function drawChart() {
  initialLoad = false;
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Date');
  data.addColumn('number', 'Price');
  data.addRows(chartRows);

  // Instantiate and draw the chart.
  var chart = new google.visualization.LineChart(document.getElementById('myLineChart'));
  chart.draw(data, null);

}


$(document).ready(function() {

  window.onresize = function() {
    drawChart();
  }

  google.charts.load('current', {
    packages: ['corechart']
  });
  google.charts.setOnLoadCallback(drawChart);

});