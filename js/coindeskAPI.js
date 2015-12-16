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
            var currentPrice = data.bpi[currency].rate_float.toFixed(2);
            var currentSymbol = data.bpi[currency].symbol;
            return [currentSymbol, currentPrice];
        }
    };
    //ajax request for yesterdays USD price. 
    //sets a time interval for how often we change the price difference, but we'll only check yesterdays 
    //price once when the page loads, as this speeds up the application and might only cause an issue when the day changes.
    //later we may add a setInterval to rerun this every half hour or so.
    //for some reason the json data for yesterdays price takes slightly longer to retrieve, and can produce an 
    //error if its referenced too early, so I added a setTimeout of 30 miliseconds to give it some time to load
    $.ajax({
        dataType: "json",
        type: "GET",
        url: "https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday",
        data: {
            currency: 'USD'
        },
        success: function(data) {
            setTimeout(function (){changeSinceYesterday(data, "USD", USDPrice, "#USDPriceDiff")
          }, 30);
            setInterval(function() {
                changeSinceYesterday(data, "USD", USDPrice, "#USDPriceDiff")
            }, 15000);
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
        data: {
            currency: 'GBP'
        },
        success: function(data) {
            setTimeout(function (){changeSinceYesterday(data, "GBP", GBPPrice, "#GBPPriceDiff")
          }, 30);
            setInterval(function() {
                changeSinceYesterday(data, "GBP", GBPPrice, "#GBPPriceDiff")
            }, 15000);
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
        data: {
            currency: 'EUR'
        },
        success: function(data) {
            setTimeout(function (){changeSinceYesterday(data, "EUR", EURPrice, "#EURPriceDiff")
          }, 30);
            setInterval(function() {
                changeSinceYesterday(data, "EUR", EURPrice, "#EURPriceDiff")
            }, 15000);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Something went wrong.");
        }
    });

    //calculate the change in price. If positive we have a plus sign, black font and an up arrow
    //if negative we have red font, a minus sign, and a down arrow
    function changeSinceYesterday(data, currency, current, id) {
        var yesterday = data.bpi[Object.keys(data.bpi)[0]].toFixed(2);

        var diff = (current[1] - yesterday).toFixed(2);
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