$(document).ready(function() {
  
  function getYesterdaysDate() {
  var date = new Date();
  date.setDate(date.getDate()-1);
  return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
  }

  function getTodaysDate() {
  var date = new Date();
  return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
  }

  var todaysDate = getTodaysDate();

var yesterdaysDate = getYesterdaysDate();

  $("#startingDate").pickadate({
    format: 'yyyy-mm-dd',
    min: '2010-07-17',
    max: yesterdaysDate,
    onSet: dateChanger()
  });

  $("#endingDate").pickadate({
    format: 'yyyy-mm-dd',
    min: '2010-07-18',
    max: todaysDate,
    onSet: dateChanger()
  });

});