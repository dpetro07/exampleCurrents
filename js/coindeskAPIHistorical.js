function dateChanger() {
  var startingDatePrefix = "start=";
  var endingDatePrefix = "&end=";
  if (formValidator() === true || initialLoad === true) {
    var ajaxStart = startingDatePrefix + startingDate;
    var ajaxEnd = endingDatePrefix + endingDate;
    getHistData(histCur, ajaxStart, ajaxEnd);

  }
}

yesterdaysDate = getYesterdaysDate()
endingDate = getTodaysDate();
startingDate = getLastWeeksDate();

dateChanger();

//checks to see that both forms are filled before taking any action. 
function formValidator() {
  if ($("#startingDate").val() !== "" && $("#endingDate").val() !== "") {
    startingDate = $("#startingDate").val();
    console.log(startingDate);
    endingDate = $("#endingDate").val();
    console.log(endingDate);
    return true;
  } else {
    return false
  }

}

function getYesterdaysDate() {
  var day;
  var month;
  var date = new Date();
  date.setDate(date.getDate() - 1);
  month = (date.getMonth() + 1);
  day = date.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return date.getFullYear() + '-' + month + '-' + day;
}

function getLastWeeksDate() {
  var date = new Date();

  date.setDate(date.getDate() - 7);
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

function getTodaysDate() {
  var day;
  var month;
  var date = new Date();
  month = (date.getMonth() + 1);
  day = date.getDate();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return date.getFullYear() + '-' + month + '-' + day;
}

//we grab the currency selected, the start, and end dates and send them to the ajax request to return the historical data
function getHistData(cur, start, end) {

  var url = "https://api.coindesk.com/v1/bpi/historical/close.json?"

  $.ajax({
    dataType: "json",
    type: "GET",
    url: url + start + end,
    data: {
      currency: histCur
    },
    success: function(data) {
      chartRows = [];
      histObject = data.bpi;
      histDates = Object.keys(histObject);
      histValues = [];
      for (var i = 0; i < histDates.length; i++) {
        var val = histObject[histDates[i]];
        histValues.push(val);
      }
      for (var i = 0; i < histValues.length; i++) {
        chartRows.push([histDates[i], histValues[i]]);
      };
      if (initialLoad === false) {
        drawChart();
      }
      console.log(histDates);
      console.log(histValues);
      console.log(histObject);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Unable to retrieve data, some depencies could not be loaded.");
    }
  });

}

//function that makes sure user is choossing an end date that is greater than their start date
function scopeChecker() {
  var startVal = $("#startingDate").val();
  var endVal = $("#endingDate").val();

  var startArr = startVal.split('-');
  var startYr = startArr[0];
  var startMo = startArr[1];
  var startDa = startArr[2];

  var endArr = endVal.split('-');
  var endYr = endArr[0];
  var endMo = endArr[1];
  var endDa = endArr[2];

  if (startYr > endYr) {
    bootbox.alert("Choose an end date that is greater than your start date.");
    $("#startingDate").val("");
    $("#endingDate").val("");
  } else if (startMo > endMo) {
    bootbox.alert("Choose an end date that is greater than your start date.");
    $("#startingDate").val("");
    $("#endingDate").val("");
  } else if (startDa > endDa) {
    bootbox.alert("Choose an end date that is greater than your start date.");
    $("#startingDate").val("");
    $("#endingDate").val("");
  } else {
    dateChanger();
  }
}

//sets value of histCur when page loads, also finds todays date.
$(document).ready(function() {
  histCur = $("#historicalCurrency").text();

  //setting values for yesterdays date, and the initial ending and starting date to be one week apart to show
  //the initial graph data

  //sets creates a datepicker from the #startingDate input field
  //some functions of datepicker didnt work as intended, onSet for example, so this function fixes those inconsistencies
  $('#startingDate').click(function() {
    var oldInput = $(this); //save this for using in the onSet event
    var newInput = $(this).clone(true); //clone old input to prevent weird changes from datepicker.js
    $(this).pickadate({
      format: 'yyyy-mm-dd',
      min: '2010-07-17',
      max: yesterdaysDate,
      onSet: function(event) { //occurs when something is selected
        dateChanger();
        if (event.highlight == undefined) { //is false when changing months         
          $(oldInput).next().remove(); //hide picker
          $(newInput).val($(oldInput).val()); //save value from weird generated input
          $(oldInput).before(newInput); //place new normal input
          $(oldInput).remove(); // remove weird input
        }
      }
    })
  });

  //sets creates a datepicker from the #endingDate input field
  //some functions of datepicker didnt work as intended, onSet for example, so this function fixes those inconsistencies
  $('#endingDate').click(function() {
    var oldInput = $(this); //save this for using in the onSet event
    var newInput = $(this).clone(true); //clone old input to prevent weird changes from datepicker.js
    $(this).pickadate({
      format: 'yyyy-mm-dd',
      min: '2010-07-17',
      max: yesterdaysDate,
      onSet: function(event) { //occurs when something is selected
        scopeChecker()
        if (event.highlight == undefined) { //is false when changing months         
          $(oldInput).next().remove(); //hide picker
          $(newInput).val($(oldInput).val()); //save value from weird generated input
          $(oldInput).before(newInput); //place new normal input
          $(oldInput).remove(); // remove weird input
        }
      }
    })
  });

  //calls dateChanger when the the histCur is changed
  $("#USDCur").click(function(event) {
    event.preventDefault();
    $("#historicalCurrency").text("USD");
    histCur = "USD";
    dateChanger();
  });
  //calls dateChanger when the the histCur is changed
  $("#GBPCur").click(function(event) {
    event.preventDefault();
    $("#historicalCurrency").text("GBP");
    histCur = "GBP";
    dateChanger();
  });
  //calls dateChanger when the the histCur is changed
  $("#EURCur").click(function(event) {
    event.preventDefault();
    $("#historicalCurrency").text("EUR");
    histCur = "EUR";
    dateChanger();
  });

});