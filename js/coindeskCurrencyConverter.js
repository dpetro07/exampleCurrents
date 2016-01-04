$(document).ready(function() {
  //sets the selected currency to USB by default
  var selectedCurrency = "USD";
  //stores the value of the last clicked input field, either bitcoin or real currency to prevent issues when
  //switching between converting real currency to bitcoin and vice versa
  var lastClicked;
  //prevents user from typing anything except numbers and decimals in the currency converter fields
  $('.decimal').keyup(function() {
    var val = $(this).val();
    if (isNaN(val)) {
      val = val.replace(/[^0-9\.]/g, '');
      if (val.split('.').length > 2)
        val = val.replace(/\.+$/, "");
    }
    $(this).val(val);
  });

  //when currency is selected as USD, the text in the dropdown changes and currencySwapper() is called
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

  //converts convery as soon as its typed in
  $('#bitCoinStarting').keyup(function() {
    convertCurrencyBitcoin();

  });

  //converts convery as soon as its typed in
  $('#realCurrency').keyup(function() {
    convertCurrencyReal();
  });

  //converts from real currency to bitcoin
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

  //converts from bitcoin to real currency
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

  //when the currency is switched, it checks to see what we want to convert, then converts it to or from the selected currency
  function currencySwapper() {
    if (lastClicked === "real") {
      convertCurrencyReal();
    } else {
      convertCurrencyBitcoin();
    }
  }
});