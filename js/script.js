
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var $streetview = $('#streetview');

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
    var img = ["<img src=' " + $url + " '>"];
    $streetview.html(img);

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': "38730f0954124f1a8296639059a17f57",
      'q': city
    });

    $.getJSON( url, function(result) {
      console.log("Load New York Times Articles")
      $nytHeaderElem.text("New York Times Articles about: " + city)
      var items = [];
        $.each(result.response.docs, function( key, val ) {
          items.push( "<li id='article-list'>" + "<a href=' " + val.web_url + " '>" +
          val.headline.main + "</a><p>" + val.snippet + "</p></li>" );
        });
        items.push("<ul/>");
        $nytElem.html(items);
    }) .fail(function() {
      $nytHeaderElem.text("New York Times Articles could not be loaded")
    });

    console.log("Load Wikipedia Articles")
    var wikiurl = "https://en.wikipedia.org/w/api.php";
    wikiurl += '?' + $.param({
      'action' : 'opensearch',
      'search' : city,
      'format' : 'json',
    }) + '&callback=?';
    console.log(wikiurl)
    $.ajax({
      method: 'GET',
      url: wikiurl,
      dataType: "jsonp",
      timeout: 8000,
    }).done(function(result) {
      var links = [];
      $.each(result[3], function(key, val) {
        links.push( "<li id='wikipedia-links'>" + "<a href=' " + val + " '>" +
        val + "</a></li>" );
        });
      links.push("<ul/>");
      $wikiElem.html(links);
    }).fail(function(result) {
      $wikiElem.text("Wikipedia resources could not be loaded. Please try again!");
    });



    return false;
};

$('#form-container').submit(loadData);
