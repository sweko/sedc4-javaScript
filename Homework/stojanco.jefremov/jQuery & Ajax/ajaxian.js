$(function () {
    loadArtistData('Ceca');
    
    $('#imageButtons').click(function(e) {
        var target = e.target;
        
        if (target.type === 'submit') {
            var allImages = activeArtist.image;
            var wantedImages = allImages.filter(function (value) {
                return value.size === target.id;
            });
            if (wantedImages.length !== 0) {
                var image = wantedImages[0];
                $("#artistImage").prop("src", image["#text"]);
            }
        }
    });
    
    $('#toggleSimilar').click(function() {
        toggleSimilarHandler(activeArtist);
    });
    
    $('#toggleAlbums').click(function() {
        toggleAlbumsHandler(activeArtist);
    });

});

var artists = [];
var activeArtist;

var showArtist = function (artist) {
    activeArtist = artist;
    $("#artistName").text(artist.name);
    var allImages = artist.image.filter(function(value) {
        return value.size;
    });
    var images = allImages.filter(function (value) {
        return value.size === "extralarge";
    });
    var $imageButtons = $('#imageButtons').empty();
    allImages.forEach(function(image) {
        var size = image.size;
        $('<button>').prop('id', size)
                     .text('Show ' + size + ' image')
                     .appendTo($imageButtons)
                     .prop('class', 'btn btn-link');
    });
    if (images.length !== 0) {
        var image = images[0];
        $("#artistImage").prop("src", image["#text"]);
    }
    $("#artistBio").html(artist.bio.summary);
    
    refreshSimilarHandler(artist);
    refreshAlbumsHandler(artist);
    artist.showSimilar = true;
    artist.showAlbums = true;
    toggleAlbumsHandler(artist);
    toggleSimilarHandler(artist);
}

var toggleAlbumsHandler = function (artist) {
    if (artist.showAlbums) {
        $("#albums").hide();
        artist.showAlbums = false;
        $("#toggleAlbums").text("Show Albums");
    } else {
        $("#albums").show();
        artist.showAlbums = true;
        $("#toggleAlbums").text("Hide Albums");
    }
};

var refreshAlbumsHandler = function(artist) {
    if (!artist.albums) {
            loadAlbumData(artist, refreshAlbumsHandler);
            return;
        }
        var albums = $("#albums");
        albums.empty();
        $.each(artist.albums, function (index, item) {
            var div = $("<div>").addClass("box").appendTo(albums);
            $("<a>")
                .text(item.name)
                .prop('href', "javascript:void(0)")
                .appendTo($("<p>").appendTo(div))
                .click(function () {
                    //showArtistByName(item.name);
                });
             var images = item.image.filter(function (value) {
                return value.size === "medium";
            });
            if (images.length !== 0) {
                var image = images[0];
                $("<img>").prop("src", image["#text"]).appendTo(div);
            }
        });
};


var toggleSimilarHandler = function (artist) {
    if (artist.showSimilar) {
        $("#similar").hide();
        artist.showSimilar = false;
        $("#toggleSimilar").text("Show Similar");
    } else {
        $("#similar").show();
        artist.showSimilar = true;
        $("#toggleSimilar").text("Hide Similar");
    }
};

var refreshSimilarHandler = function (artist) {
    var similar = $("#similar");
    similar.empty();
    $.each(artist.similar.artist, function (index, item) {
        var div = $("<div>").addClass("box").appendTo(similar);
        $("<a>")
            .text(item.name)
            .prop('href', "javascript:void(0)")
            .appendTo($("<p>").appendTo(div))
            .click(function () {
                showArtistByName(item.name);
            });
        var images = item.image.filter(function (value) {
            return value.size === "medium";
        });
        if (images.length !== 0) {
            var image = images[0];
            $("<img>").prop("src", image["#text"]).appendTo(div);
        }
    });
}

var showArtistByName = function (artistName) {
    var artist = artists.filter(function(artist) {
        return artist.name === artistName;
    });
    if (artist.length > 0) {
        showArtist(artist[0]);
    } else {
        loadArtistData(artistName);   
    }
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
        url: 'http://ws.audioscrobbler.com/2.0/?method=artist.getTopAlbums&api_key=91dcbbe75821abf1c3c43e4120573e99&format=json&limit=5&artist=' + artist.name,
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

var loadSongsData = function (album) {
    $.ajax({
        url: 'http://ws.audioscrobbler.com/2.0/?method=album.getInfo&api_key=91dcbbe75821abf1c3c43e4120573e99&format=json&artist=' + album.artist.name
        + '&album=' + album.name,
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

$lastfm.get({
     method:"artist.getTopAlbums",
     artist: "Metallica",
     success : function(data){
         console.log(data);
     }
});