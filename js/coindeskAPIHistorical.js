var startingDate;
var endingDate;
var startingDatePrefix = "start=";
var endingDatePrefix = "&end=";
var histCur;
//setting up some global variables that will need to be used by several functions

//dateChanger checks that both date fields are filled. if so, we call the getHistData function
function dateChanger() {
    if ($("#startingDate").val() !== "" && $("#endingDate").val() !== "") {
        startingDate = $("#startingDate").val();
        console.log(startingDate);
        endingDate = $("#endingDate").val();
        console.log(endingDate);
        startingDate = startingDatePrefix + startingDate;
        endingDate = endingDatePrefix + endingDate;
        getHistData(histCur, startingDate, endingDate);
    } else {
        return;
    }

}

//we grab the currency selected, the start, and end dates and send them to the ajax request to return the historical data
function getHistData(cur, start, end) {

    var url = "https://api.coindesk.com/v1/bpi/historical/close.json?"

    $.ajax({
        dataType: "json",
        type: "GET",
        url: url + startingDate + endingDate,
        data: {
            currency: histCur
        },
        success: function(data) {
            console.log(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Unable to retrieve data, some depencies could not be loaded.");
        }
    });

}

//sets value of histCur when page loads, also finds todays date.
$(document).ready(function() {
    histCur = $("#historicalCurrency").text();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 
    var today = yyyy+'-'+mm+'-'+dd;
    console.log(today);
//calls dateChanger when the datepicker is changed
    $("#startingDate").Zebra_DatePicker({
        direction: ['2010-07-17', today],
        onSelect: function() {
            dateChanger();
        }
    });
    //calls dateChanger when the datepicker is changed
   $("#endingDate").Zebra_DatePicker({
        direction: ['2010-07-17', today],
        onSelect: function() {
            dateChanger();
        }
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