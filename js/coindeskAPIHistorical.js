var startingDate;
var endingDate;
var startingDatePrefix = "start=";
var endingDatePrefix = "&end=";
var histCur;
var histObject;
//setting up some global variables that will need to be used by several functions

//dateChanger checks that both date fields are filled using the formValidator() functio. if so, we call the getHistData function, also sets the global variables 
//startingDate and endingDate

function dateChanger() {
    if (formValidator() === true) {
        var ajaxStart = startingDatePrefix + startingDate;
        var ajaxEnd = endingDatePrefix + endingDate;
        getHistData(histCur, ajaxStart, ajaxEnd);
    }
}

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
            histObject = data.bpi;
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
            alert("Choose an end date that is greater than your start date.");
            $("#startingDate").val("");
            $("#endingDate").val("");
        } else if (startMo > endMo) {
            alert("Choose an end date that is greater than your start date.");
            $("#startingDate").val("");
            $("#endingDate").val("");
        } else if (startDa > endDa) {
            alert("Choose an end date that is greater than your start date.");
            $("#startingDate").val("");
            $("#endingDate").val("");
        } else {
            dateChanger();
        }
    }

//sets value of histCur when page loads, also finds todays date.
$(document).ready(function() {
    histCur = $("#historicalCurrency").text();
  
//calls dateChanger when the datepicker is changed
     function getYesterdaysDate() {
  var date = new Date();
  date.setDate(date.getDate()-1);
  return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
  }

  function getTodaysDate() {
  var date = new Date();
  return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
  }

//creating variables for todays date and yesterdays date to help scope the datepickers
  var todaysDate = getTodaysDate();

  var yesterdaysDate = getYesterdaysDate();

//sets creates a datepicker from the #startingDate input field
//some functions of datepicker didnt work as intended, onSet for example, so this function fixes those inconsistencies
  $('#startingDate').click(function () {
    var oldInput = $(this); //save this for using in the onSet event
    var newInput = $(this).clone(true); //clone old input to prevent weird changes from datepicker.js
    $(this).pickadate({
    format: 'yyyy-mm-dd',
    min: '2010-07-17',
    max: yesterdaysDate,
        onSet: function (event) { //occurs when something is selected
            dateChanger();
            if(event.highlight == undefined){  //is false when changing months         
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
  $('#endingDate').click(function () {
    var oldInput = $(this); //save this for using in the onSet event
    var newInput = $(this).clone(true); //clone old input to prevent weird changes from datepicker.js
    $(this).pickadate({
    format: 'yyyy-mm-dd',
    min: '2010-07-17',
    max: yesterdaysDate,
        onSet: function (event) { //occurs when something is selected
            scopeChecker()
            if(event.highlight == undefined){  //is false when changing months         
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