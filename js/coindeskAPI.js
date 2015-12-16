$(document).ready(function() {
  var USDPrice;
  var GBPPrice;
  var EURPrice;

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

 function displayCurrentPrices() {
  $("#currentPriceUSD").css('font-weight', 'bold').html(USDPrice);
    $(".currentPriceGBP").css('font-weight', 'bold').html(GBPPrice);
    $(".currentPriceEUR").css('font-weight', 'bold').html(EURPrice);
 }

 function getCurrentPrice(data, currency) {
  var currentPrice = Math.round(data.bpi[currency].rate_float * 100) / 100;
  var currentSymbol = data.bpi[currency].symbol;
  return [currentSymbol, currentPrice];
 }

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

  $.ajax({
    dataType: "json",
    type: "GET",
    url: "https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday",
    data: {currency: 'GBP'},
    success: function(data) {

      setTimeout(function() {
        changeSinceYesterday(data,"EUR", EURPrice, "#EURPriceDiff")
      }, 20);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert("Something went wrong.");
    }
  });

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
  
});