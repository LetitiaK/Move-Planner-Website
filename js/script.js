
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
    console.log("<img class='bgimg' src=' " + $url + " '>");
    $body.append("<img class='bgimg' src=' " + $url + " '>");



    return false;
};

$('#form-container').submit(loadData);
