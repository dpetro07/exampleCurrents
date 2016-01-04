    //currency prices in the 'current price' section
    var USDPrice; 
    var GBPPrice;
    var EURPrice;

    //the selected value of the start and end dates in the datepicker. Use these to get a date range for tweets, news, etc
    var startingDate;
    var endingDate;

    //the type of currency we are looking up historical data for
    var histCur;

    //the object returned from the historical data ajax call. It will be in {date: price} format
    var histObject;

    //when the page is loaded up and all initial js has been run, this gets set to false to prevent issues with the historical bitcoin functions 
    var initialLoad = true;

    //an arrray of the keys from the histObject
    var histDates;

    //an array of the values of the histObject
    var histValues;

    //the array that gets passed to google charts containing the histDates and histValues
    var chartRows = [];