// var articles = 0;
// var maxArticles = 7;




// $.Ajax(

//     'type': 'GET',
//     'url': 'http://api.nytimes.com/svc/search/v2/articlesearch.json',
//     data: {
//         'fq': "bitcoin&begin_date=20080101&end_date=20150101",
//         'response-format': "json",
//         'api-key': "27a6b42078d85e9fd9743e17ce52db9c:4:73801956",
//         'callback': 'svc_search_v2_articlesearch'
//     }),
//         success: function createNY(nyTimesData) {
//             $.each{
//                 nyTimesData.data.children,
//                 function (i, giveMe){
//                     var url = ''
//                     if (giveMe.docs.web_url <= maxArticles){
//                         articles++;
//                         url+= giveMe.data.web_url;
//                     }
//                     $("#test").append(url);

//                 }

//             }
        
        
//     }
// });

// $.ajax({
//     url: "http://otter.topsy.com/urlinfo.js?url=http://www.nytimes.com",
//     dataType: 'jsonp',
//     success: function(results){
//         var title = results.response.oneforty;
//         var numTweets = results.response.trackback_total;
//         $('#results').append(title + ' has ' + numTweets + ' tweets.');
//     }
// });

$.ajax({
  url: 'http://api.nytimes.com/svc/search/v2/articlesearch.json?&q=bitcoin&api-key=27a6b42078d85e9fd9743e17ce52db9c:4:73801956',
  dataType: 'json',
  success: function(resp){
    console.log(resp.response.docs.length)
    for (var i = 0; i < resp.response.docs.length; i++) {
      $("#output").append('<div class="row movie">');
      $("#output").append('<div class="col-md-3 title"><img src="http://www.nytimes.com/' + resp.response.docs[i].multimedia[0].url +'">' + '</div>');
      $("#output").append('<div class="col-md-3 title">' + resp.response.docs[i].headline.main + '</div>');
      $("#output").append('<div class="col-md-6 teaser">'  + resp.response.docs[i].lead_paragraph  + ' <a href="' + resp.response.docs[i].lead_paragraph + '"> Read More </a>');
      $("#output").append('</div>');
      $("#output").append('</div>');
    }
  },
  error: function( req, status, err ) {
    console.log( 'something went wrong', status, err );
  }
});
