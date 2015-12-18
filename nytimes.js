$(document).ready(function() {


$.ajax({

    'type': 'GET',
    'url': 'http://api.nytimes.com/svc/search/v2/articlesearch.json',
    data: {
        'fq': "bitcoin&begin_date=20080101&end_date=20150101",
        'response-format': "json",
        'api-key': "27a6b42078d85e9fd9743e17ce52db9c:4:73801956",
        'callback': 'svc_search_v2_articlesearch'
    },
        success: function(data) {
        
        console.log(data);
    }
});
var beh = response.docs;
console.log(beh);

});

