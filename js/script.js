
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    console.log("Load StreetView image");
    var street = $('#street').val();
    var city = $('#city').val();
    var address = street + ', ' + city;
    $greeting.text("So, you want to live at " + address + "?");

    var $url = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location='+ address;
    $body.append("<img class='bgimg' src=' " + $url + " '>");

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': "38730f0954124f1a8296639059a17f57",
      'q': city
    });

    $.getJSON( url, function(result) {
      $nytHeaderElem.text("New York Times Articles about: " + city)
      var items = [];
        $.each(result.response.docs, function( key, val ) {
          items.push( "<li id='article-list'>" + "<a href=' " + val.web_url + " '>" +
          val.headline.main + "</a><p>" + val.snippet + "</p></a></li>" );
        });
        items.push("<ul/>");
        $nytElem.html(items);
    }) .fail(function() {
      $nytHeaderElem.text("New York Times Articles could not be loaded")
    });

    var wikiurl = "https://en.wikipedia.org/w/api.php";
    wikiurl += '?' + $.param({
      'action' : 'query',
      'titles' : city,
      'prop' : 'info',
      'rvprop' : 'content',
      'format' : 'json'
    });
    console.log("I am here!!")
    console.log(wikiurl)


    return false;
};

$('#form-container').submit(loadData);
