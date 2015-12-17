$(document).ready(function() {

  var start;
  var end;

    $.ajax({
        dataType: "json",
        type: "GET",
        url: "https://api.coindesk.com/v1/bpi/currentprice.json",
        data: {
        currency: 'USD',
        start: 2013-09-01,
        end: 2013-09-05
        },
        success: function(data) {
            console.log(data);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Something went wrong.");
        }
    });

});