$(document).ready(function() {
  //global vars for the current prices of bitcoin in different currencies
  var USDPrice;
  var GBPPrice;
  var EURPrice;
//wrapping most of code into a function we call setInterval on. Every 20 seconds the data is updated
main();
setInterval(main, 15000);
function main() {
  //ajax request for the current price data. Calling the getCurrentPrice function to
//return the price and currency symbol to the variables above.
//then calling display current prices to write this information to the DOM
 $.ajax({
    dataType: "json",
    type: "GET",
    url: "https://api.coindesk.com/v1/bpi/currentprice.json",
    success: function(data) {
    USDPrice = getCurrentPrice(data, "USD");
    GBPPrice = getCurrentPrice(data, "GBP");
    EURPrice = getCurrentPrice(data, "EUR");
    displayCurrentPrices();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert("Something went wrong.");
    }
  });

//this function will write the current cost of bitcoin to the DOM
 function displayCurrentPrices() {
  $("#currentPriceUSD").css('font-weight', 'bold').html(USDPrice);
    $(".currentPriceGBP").css('font-weight', 'bold').html(GBPPrice);
    $(".currentPriceEUR").css('font-weight', 'bold').html(EURPrice);
 }

//this function will return the current price and symbol of that currency.
 function getCurrentPrice(data, currency) {
  var currentPrice = Math.round(data.bpi[currency].rate_float * 100) / 100;
  var currentSymbol = data.bpi[currency].symbol;
  return [currentSymbol, currentPrice];
 }

//ajax request for yesterdays USD price. Using set timeout because sometimes this 
//information would not be available right away and cause an error.
 $.ajax({
    dataType: "json",
    type: "GET",
    url: "https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday",
    data: {currency: 'USD'},
    success: function(data) {

      setTimeout(function() {
        changeSinceYesterday(data,"USD", USDPrice, "#USDPriceDiff")
      }, 20);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert("Something went wrong.");
    }
  });

//ajax request for yesterdays GBP bitcoin price
 $.ajax({
    dataType: "json",
    type: "GET",
    url: "https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday",
    data: {currency: 'GBP'},
    success: function(data) {

      setTimeout(function() {
        changeSinceYesterday(data,"GBP", GBPPrice, "#GBPPriceDiff")
      }, 20);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert("Something went wrong.");
    }
  });

//ajax request for yesterdays EUR price
  $.ajax({
    dataType: "json",
    type: "GET",
    url: "https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday",
    data: {currency: 'EUR'},
    success: function(data) {

      setTimeout(function() {
        changeSinceYesterday(data,"EUR", EURPrice, "#EURPriceDiff")
      }, 20);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert("Something went wrong.");
    }
  });

//calculate the change in price. If positive we have a plus sign, black font and an up arrow
//if negative we have red font, a minus sign, and a down arrow
 function changeSinceYesterday(data, currency, current, id) {
  var yesterday = Math.round(data.bpi[Object.keys(data.bpi)[0]] * 100) / 100;

  var diff = Math.round((current[1] - yesterday) * 100) / 100;
  if (diff < 0) {
    $(id).css('color', 'red');
    $(id).html(diff);
    $(id).append('<i class="fa fa-chevron-down"></i>');
  } else { 
    $(id).css('color', 'black');
    $(id).html("+" + diff);
    $(id).append('<i class="fa fa-chevron-up"></i>')
  }
 } 
  };
});