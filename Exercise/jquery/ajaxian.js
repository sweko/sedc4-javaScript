$(function () {
    $.ajax({
        url: 'http://ws.audioscrobbler.com/2.0/?method=artist.getInfo&api_key=91dcbbe75821abf1c3c43e4120573e99&artist=Muse&format=json',
        data: null,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            artists.push(data.artist);
            showArtist(data.artist);
        },
        error: function () { alert('Failed!'); },
    });

    $("#my-dialog").dialog({
        title: "My Dialog",
        closeOnEscape: true,
        modal: true,
        draggable: true,
        autoOpen: false,
        beforeClose: function (e) {
            $("<div>")
                .html("Are you sure?")
                .appendTo($("body"))
                .dialog({modal: true});
            
            return confirm("Are you sure?");
        }
    });

    $("#show-dialog").click(function () {
        $("#my-dialog").dialog("open");
    });

    $("#close-dialog").click(function () {
        $("#my-dialog").dialog("close");
    });
});

var artists = [];
var activeArtist;

var showArtist = function (artist) {
    activeArtist = artist;
    $("#artistName").text(artist.name);

    $("#buttons").empty();
    artist.image
        .filter(function (value) { return value.size; })
        .forEach(function (item) {
            $("<button>")
                .text(item.size)
                .appendTo($("#buttons"))
                .click(function () {
                    $("#artistImage").prop("src", item["#text"]);
                });
        });

    var images = artist.image.filter(function (value) {
        return value.size === "extralarge";
    });
    if (images.length !== 0) {
        var image = images[0];
        $("#artistImage").prop("src", image["#text"]);
    }
    $("#artistBio").html(artist.bio.summary);

    artist.showSimilar = false;
    toggleSimilarHandler(artist);
    $("#toggleSimilar").click(function () { toggleSimilarHandler(artist); });

    artist.showAlbums = false;
    toggleAlbumsHandler(artist);
    $("#toggleAlbums").click(function () { toggleAlbumsHandler(artist); });
};

var toggleAlbumsHandler = function (artist) {
    if (artist.showAlbums) {
        $("#albums").hide();
        artist.showAlbums = false;
        $("#toggleAlbums").text("Show Albums");
    } else {
        if (!artist.albums) {
            loadAlbumData(artist, toggleAlbumsHandler);
            return;
        }
        var albums = $("#albums");
        albums.show().empty();
        var executionCount = 1;
        $.each(artist.albums, function (index, item) {
            $("<a>")
                .text(item.name)
                .prop('href', "javascript:void(0)")
                .appendTo($("<h3>").appendTo(albums))
                .click(function () {
                    //showArtistByName(item.name);
                });
            var images = item.image.filter(function (value) {
                return value.size === "medium";
            });
            if (images.length !== 0) {
                var image = images[0];
                $("<img>").prop("src", image["#text"]).appendTo(albums).on("load", function () {
                    if (executionCount === artist.similar.artist.length) {
                        albums.accordion({
                            collapsible: true,
                            heightStyle: "auto"
                        });
                    } else {
                        executionCount += 1;
                    }
                });
            }
        });
        artist.showAlbums = true;
        $("#toggleAlbums").text("Hide Albums");
    }
};


var toggleSimilarHandler = function (artist) {
    if (artist.showSimilar) {
        $("#similar").hide();
        artist.showSimilar = false;
        $("#toggleSimilar").text("Show Similar");
    } else {
        var similar = $("#similar");
        similar.show().empty();
        var ul = $("<ul>").appendTo(similar);
        $.each(artist.similar.artist, function (index, item) {
            $("<a>")
                .text(item.name)
                .prop('href', "#tab-" + index)
                .appendTo($("<li>").appendTo(ul));

            var images = item.image.filter(function (value) {
                return value.size === "medium";
            });

            var div = $("<div id='tab-" + index + "'>").appendTo(similar);

            $("<a>")
                .text(item.name)
                .prop('href', "javascript:void(0)")
                .appendTo($("<li>").appendTo(div))
                .click(function () {
                    showArtistByName(item.name);
                });


            if (images.length !== 0) {
                var image = images[0];
                $("<img>").prop("src", image["#text"]).appendTo(div).on("load", function () {
                    $("#similar").tabs("refresh");
                });
            }
        });
        artist.showSimilar = true;
        $("#toggleSimilar").text("Hide Similar");
        $("#similar").tabs({
            collapsible: true,
            heightStyle: "auto"
        });
    }
};

var showArtistByName = function (artistName) {
    loadArtistData(artistName);
};


var loadArtistData = function (artistName) {
    $.ajax({
        url: 'http://ws.audioscrobbler.com/2.0/?method=artist.getInfo&api_key=91dcbbe75821abf1c3c43e4120573e99&format=json&artist=' + artistName,
        data: null,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            artists.push(data.artist);
            showArtist(data.artist);
        },
        error: function () { alert('Failed!'); },
    });
};

var loadAlbumData = function (artist, callback) {
    $.ajax({
        url: 'http://ws.audioscrobbler.com/2.0/?method=artist.getTopAlbums&api_key=91dcbbe75821abf1c3c43e4120573e99&format=json&limit=10&artist=' + artist.name,
        data: null,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            artist.albums = data.topalbums.album;
            callback(artist);
        },
        error: function () { alert('Failed!'); },
    });
};

// $lastfm.get({
//     method: "artist.getTopAlbums",
//     artist: "Metallica",
//     success: function (data) {
//         console.log(data);
//     }
// });
