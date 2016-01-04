
// delcares subreddit to construct url for call
var subreddit = 'bitcoin';
var searchTerm = 'bitcoin';
var url = "https://www.reddit.com/subreddits/search.json";
var redditMain = "https://www.reddit.com";
// initialies reddit thread count to zero
var rddt = 0;
//initializes reddit thumbnail count to zero
var tbns = 0;
// defines maximum number of thumbnails to retun
var maxtbns = 7;
// defines maximum number of threads to return
var maxrddts = 7;
// console.log(startingDate);
// console.log(endingDate);
//conversion from start date format to unix time stamp (seconds since January 1st 1970). this is required to filter by dates via the reddit api
// var startToUnix = moment(startingDate, "YYYY-MM-DD").valueOf();
// console.log(startToUnix);
// var realUnixStart = startToUnix/1000;
// console.log(realUnixStart);
//conversion from end date format to unix time stamp (seconds since January 1st 1970). this is required to filter by dates via the reddit api
// var endToUnix = moment(endingDate, "YYYY-MM-DD").valueOf();
// console.log(endToUnix);
// var realUnixEnd = endToUnix/1000;
// console.log(realUnixEnd);
//if startingDate !=== "" && endingDate !=== "") {

// url for bitcoin subreddit filtered by user specified times
//var bitcoinSubDateFiltered = "http://www.reddit.com/r/" + subreddit + "/search?sort=top&q=timestamp:" + startToUnix + ".." + endToUnix + "&syntax=cloudsearch&restrict_sr=on";
// makes call and gets json
$.getJSON(
  //default url that returns top posts for the week based on the current date
"http://www.reddit.com/r/" + subreddit + ".json?sort=top&t=week&limit=40&jsonp=?",

function defaultBuild(data)
{
  $.each(
    data.data.children,
    function (i, post) {
      var img = ['jpg','png','gif'];
      var item = '';
      var tbn = '';
      // iterates through thumbnails as long as maximum limit is not reached
      //excludes 'self' default thumnail images (the generic reddit robot)
      //if (post.data.thumbnail && post.data.thumbnail != 'self' && tbns < maxtbns) {
        if (post.data.thumbnail && tbns < maxtbns && i>0) {
        tbns++;
        // each iteration contructs a new tbn(thumbnail) associated with thread
        tbn += '<a href="' + post.data.url + '" title="' + post.data.title + '" target="_blank"><img src="' + post.data.thumbnail + '"></a>';
        // iterates through items (thread posts in subreddit) as long as maximum limit is not reached
      } else if (rddt<maxrddts && i>0) {
          rddt++;
          // each iteration contructs a new item which is a thread post with title, updown/votes, & number of comments
          item = '<li><p><strong><a href="' + post.data.url + '" target="_blank">' + post.data.title + '</strong></a></p>';
          item += '<p>' + post.data.ups + '&uarr; ' + post.data.downs + '&darr; | <a href="https://reddit.com' + post.data.permalink + '" target="_blank">' + post.data.num_comments + ' Comments</a></p></li>';
      }
      // if (x=$.inArray(post.data.url.split('.').pop(), img)>0) {
      //   console.log(x + ' : ' + post.data.url);
      //   console.log('tbn: '+post.data.thumbnail);
      //   tbn += '<a href="' + post.data.url + '" target="_blank"><img src="' + post.data.thumbnail + '"></a>';
      // }

      $("#reddit .posts").append(item);
      $("#reddit .thumbs").append(tbn);
    }
  )
}
)

$.ajax(
    url,
    {
        data: { q: searchTerm },
        success: function(responseData) {
          var subredditOption = '';
          var links = '';
          var combo = '';
          var allSubredditComments = '';
            if (responseData.data.children.length > 0) {
                console.log('# of results: ' + responseData.data.children.length);
                $.each(responseData.data.children, function(idx, searchResult) {
                    subredditOption += (searchResult.data.title + '<br>');
                    links += (redditMain + searchResult.data.url + '<br>');
                    combo += ("<a href="+   "'" + redditMain + searchResult.data.url+ "'>" + searchResult.data.title + "</a>" + '<br>');
                    allSubredditComments += ("<a href="+   "'" + redditMain + searchResult.data.url+ "'>" + searchResult.data.title + "</a>" + '<br>');
                    //<a href="http://www.yahoo.com">here</a>
                });
            } 
     
        //$("#reddit .titles").append(subredditOption);
        //$("#reddit .urls").append(links);
        $("#reddit .combined").append(combo);
        $("#reddit .text").append(allSubredditComments);
    }
  }
);



