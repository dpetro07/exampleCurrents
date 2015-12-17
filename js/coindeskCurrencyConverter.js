$(document).ready(function() {
var selectedCurrency = "USD";
var lastClicked;
$('.decimal').keyup(function(){
    var val = $(this).val();
    if(isNaN(val)){
         val = val.replace(/[^0-9\.]/g,'');
         if(val.split('.').length>2) 
             val =val.replace(/\.+$/,"");
    }
    $(this).val(val); 
});

  $("#USDConvert").click(function(event) {
    event.preventDefault();
    $("#selectedCurrency").text("USD");
    selectedCurrency = "USD";
    currencySwapper();
  });

  $("#GBPConvert").click(function(event) {
    event.preventDefault();
    $("#selectedCurrency").text("GBP");
    selectedCurrency = "GBP";
    currencySwapper();
  });

  $("#EURConvert").click(function(event) {
    event.preventDefault();
    $("#selectedCurrency").text("EUR");
    selectedCurrency = "EUR";
    currencySwapper();
  });

  $('#bitCoinStarting').keyup(function(){
    convertCurrencyBitcoin();
   
});

   $('#realCurrency').keyup(function(){
    convertCurrencyReal();
});
  
  function convertCurrencyBitcoin() {
    var bitcoinCost = $('#bitCoinStarting').val();
    var selectedCost = $('#realCurrency').val();
    switch (selectedCurrency) {
    case "USD":
        $('#realCurrency').val((bitcoinCost * USDPrice[1]).toFixed(2));
        break;
    case "GBP":
        $('#realCurrency').val((bitcoinCost * GBPPrice[1]).toFixed(2));
        break;
    case "EUR":
        $('#realCurrency').val((bitcoinCost * EURPrice[1]).toFixed(2));
        break;
      }
      lastClicked = "bitcoin";
}
  function convertCurrencyReal() {
    var bitcoinCost = $('#bitCoinStarting').val();
    var selectedCost = $('#realCurrency').val();
    switch (selectedCurrency) {
    case "USD":
        $('#bitCoinStarting').val((selectedCost / USDPrice[1]).toFixed(2));
        break;
    case "GBP":
        $('#bitCoinStarting').val((selectedCost / GBPPrice[1]).toFixed(2));
        break;
    case "EUR":
        $('#bitCoinStarting').val((selectedCost / EURPrice[1]).toFixed(2));
        break;
      }
      lastClicked = "real";
}
      function currencySwapper() {
        if (lastClicked === "real") {
          convertCurrencyReal();
        } else {
          convertCurrencyBitcoin();
        }
      }
});