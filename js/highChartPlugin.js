$(function () {
    $('#container').highcharts({
        title: {
            text: 'Bitcoin Pricing'
        },

        subtitle: {
            text: 'Below we should be able to input an array of dates on the X Axis, and an array of prices linking to the dates on the Y Axis'
        },


        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },

        series: [{
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        }]
    });
});