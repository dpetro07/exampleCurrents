$(document).ready(function() {

var searchTerm = 'bitcoin';
var url = 'https://www.reddit.com/r/bitcoin/new.json?sort=new';



$.ajax(
    url,
    {
        data: { q: searchTerm },
        success: function(responseData) {
            if (responseData.data.children.length > 0) {
                console.log('# of results: ' + responseData.data.children.length);
                $.each(responseData.data.children, function(idx, Result) {
                     $(".list-group").append("<p>"+Result.data.title+"<p>");
                     $(".list-group").append("<a>"+Result.data.url+"<a>");
                     $(".list-group").append("<p>"+Result.data.created+"<p>");
                });
            } else {
                console.log("No subreddits match the search query!");
            }
        },
        error: function() {
            alert("Something didn't work!");
        }
    }
);


});

var dateStart = $('#startingDate').val;
var dateEnd = $('#endingDate').val;

var userDateInput = dateStart - dateEnd;
userDateInputinput = input.split(" - ").map(function (date){
    return Date.parse(date+"-0500")/1000;
}).join(" - ");
