$(function() {

    $(function () {
    $('#container').highcharts({
        data: {
            csv: document.getElementById('data').innerHTML
        },
        yAxis: {
            title: {
                text: 'Bitcoin prices'
            }
        },
        plotOptions: {
            series: {
                marker: {
                    enabled: false
                }
            }
        },
        title: {
            text: 'Historical Bitcoin Pricing'
        },
        subtitle: {
            text: 'Auto-detection of <em>mm/dd/YYYY</em> dates in Highcharts Data module'
        }
    });
});


    
   
    $('#container').highcharts('StockChart', {
        rangeSelector: {
            selected: 1,
            beyondExtremes: true
        },
        xAxis: {
            events: {
                setExtremes: function(e) {
                    /*Could fetch new data for the new extremes here*/
                    





                }
            },
            ordinal: false
        },
        title : {
            enabled : false
        },
        
        credits: {
            enabled: false
        },
        
        legend: {
            enabled: true,
            floating: true,
            layout: 'horizontal',
            verticalAlign: 'top',
            align: 'right',
            y: 30
        },
        
        series: [{
            name: 'USD to EUR',
            data: usdeur
        }],
        tooltip: {
            valueDecimals: 2
        }
    });
});