$(document).ready(function() {
  var topBitcoinStories;
  var mostRecentBitcoinStories;
  updateInterval();

  setInterval(updateInterval,300000);

  function updateInterval(){
   

  $.ajax({
    
    type: "GET",
    url: "http://hn.algolia.com/api/v1/search_by_date?query=bitcoin&tags=story",
  
    success: function(hackerNewsResponseData) {
  
        for(var i = 0; i < hackerNewsResponseData.length; i++) {
          console.log("--- story: " + hits.title);
          console.log("--- URL: " + hits.url);
                        };
            } 
        })
        error: function() {
            alert("Something didn't work!");
        }
    }
);



  
