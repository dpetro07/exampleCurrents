
// delcares subreddit to construct url for call
var subreddit = 'bitcoin';
// initialies reddit thread count to zero
var rddt = 0;
//initializes reddit thumbnail count to zero
var tbns = 0;
// defines maximum thumb number of thumbnails to retun
var maxtbns = 7;
// defines maximum number of threads to return
var maxrddts = 7;

// makes call and gets json 
$.getJSON(
"http://www.reddit.com/r/" + subreddit + ".json?sort=top&t=week&limit=40&jsonp=?",
function build(data)
{
  $.each(
    data.data.children,
    function (i, post) {
      var img = ['jpg','png','gif'];
      var item = '';
      var tbn = '';
      // iterates through thumbnails as long as maximum limit is not reached
      if (post.data.thumbnail && post.data.thumbnail != 'self' && tbns < maxtbns) {
        tbns++;
        // each iteration contructs a new tbn(thumbnail) associated with thread
        tbn += '<a href="' + post.data.url + '" title="' + post.data.title + '" target="_blank"><img src="' + post.data.thumbnail + '"></a>';
        // iterates through items (thread posts in subreddit) as long as maximum limit is not reached
      } else if (rddt<maxrddts) {
          rddt++;
          // each iteration contructs a new item which is a thread post with title & updown/votes & number of comments
          item = '<li><p><strong><a href="' + post.data.url + '" target="_blank">' + post.data.title + '</strong></a></p>';
          item += '<p>' + post.data.ups + '&uarr; ' + post.data.downs + '&darr; | <a href="//reddit.com' + post.data.permalink + '" target="_blank">' + post.data.num_comments + ' Comments</a></p></li>';
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
.success(function() { console.log("second success"); })
.error(function() { console.log("error"); })
.complete(function() { console.log("complete"); });