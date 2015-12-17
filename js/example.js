$(function() {
   
    $('#container').highcharts('StockChart', {
        rangeSelector: {
            selected: 1,
            beyondExtremes: true
        },
        xAxis: {
        events: {
          setExtremes: function(e) {
            /*Could fetch new data for the new extremes here*/
                    
                    $('#report').html('<b>Set extremes:</b> e.min: '+ Highcharts.dateFormat(null, e.min) +
              ' | e.max: '+ Highcharts.dateFormat(null, e.max) + ' | e.trigger: ' + e.trigger);
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