$(function () {
    $.ajax({
        url: 'http://ws.audioscrobbler.com/2.0/?method=artist.getInfo&api_key=91dcbbe75821abf1c3c43e4120573e99&artist=Metallica&format=json',
        data: null,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            artists.push(data.artist);
            showArtist(data.artist);
            activeArtist = data.artist;
        },
        error: function () { alert('Failed!'); },
    });

    $("#large").click(function () {
        var images = activeArtist.image.filter(function (value) {
            return value.size === "large";
        });
        if (images.length !== 0) {
            var image = images[0];
            $("#artistImage").prop("src", image["#text"]);
        }
    });

    $("#mega").click(function () {
        var images = activeArtist.image.filter(function (value) {
            return value.size === "mega";
        });
        if (images.length !== 0) {
            var image = images[0];
            $("#artistImage").prop("src", image["#text"]);
        }
    });

});

var artists = [];
var activeArtist;

var showArtist = function (artist) {
    $("#artistName").text(artist.name);
    var images = artist.image.filter(function (value) {
        return value.size === "extralarge";
    });
    if (images.length !== 0) {
        var image = images[0];
        $("#artistImage").prop("src", image["#text"]);
    }
    $("#artistBio").html(artist.bio.summary);
}