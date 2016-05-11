downloadedAristDetails = [];
downloadedAristAlbums = [];

var $lastfm = {};
(function (lfm) {
    lfm.get = function(requestObject, callback) {
        var initialUrl = 'https://ws.audioscrobbler.com/2.0/';
        var query = convertRequestObjectToQueryString(requestObject);

        (function () {
        $.ajax({
            url: initialUrl + query,
            data: null,
            type: 'GET',
            crossDomain: true,
            dataType: 'json',
            success: function (data) {
                callback(data);
            },
            error: function () { alert('Failed to get artist, cannot continue, Please refresh.'); throw new Error('failed to get artist, cannot continue, Please refresh.') },
        });
        })();
    }
    
    function convertRequestObjectToQueryString(requestObject) {
        var queryString = '?';
        Object.keys(requestObject).forEach(function(key) {
            var value = requestObject[key];
            queryString += key + '=' + value + '&';
        });
        return queryString.slice(0, -1);
    }
})($lastfm);

var dialog = {};
(function(dl) {
    
    dl.renderArtistDetails = function(details) {
        clearPreviousArtistUIData();
        displayArtistContainersExplanationText(details.name);
        createUIButtonsAndHandlersForImageSizes(details.images);
        displayLargeSizedImage(details.images);
        displaySimilarArtistsDetails(details.similarArtists);
        displayAlbumDetails(details.albums);
        displayArtistDescription(details.description);
    }
    
    dl.displayInvalidArtistMessage = function(name) {
    clearPreviousArtistUIData();
    $('.artistName').text(name + ' is not a valid artist. Enter a valid artist name and press Search again.');
   }
    
    dl.pullArtistNameFromUI = function() {
        return $('#artistNameInput').val().trim();
    }
    
    dl.displayAlbumTrackNames =  function(trackNames) {
        $('.trackNames').empty();
        $ul = $('<ol>');
        for (var i = 0; i < trackNames.length; i++) {
            trackName = trackNames[i];

            $('<li>').text(trackName).appendTo($ul);
        }
        $ul.appendTo('.trackNames');
        location.href = "#trackNames";
    }
    
    function displayArtistContainersExplanationText (name) {
        var capitalizedArtist = name.charAt(0).toUpperCase() + name.slice(1);
        $('<p class="similarArtistsPlaceholder">').text('Similar artists to ' + capitalizedArtist).appendTo('.similarArtists');
        $('<p class="artistAlbumsPlaceholder">').text(capitalizedArtist + "'s albums").appendTo('.artistAlbums');  
    }
   
    function createUIButtonsAndHandlersForImageSizes(sizesAndSources) {
        sizesAndSources.forEach(function(obj) {
            if (obj.size !== '') {
                $('<button>').attr('value', obj.size).text(obj.size).click(function() {
                $('.artistImage').attr('src', obj.source);  
            }).appendTo('.imageButtons');
            }
        });
   }
    
    function displayArtistDescription(description) {
        $('.artistDescription').html(description);
    }
    
    function displayLargeSizedImage(sizesAndSourcesByImage) {
        $('.artistImage').prop('src', sizesAndSourcesByImage[2].source);
    }
    
    function displaySimilarArtistsDetails(similarArtists) {
        similarArtists.forEach(function(artist) {
            var $div = $('<div>').addClass('similarArtist');
            var $p = $('<p>');
            var $a = $('<a>').attr('href', '#').text(artist.name); 
            var $img = $('<img>').attr('src', artist.imageSrc);
            $p.append($a);
            $div.append($img);
            $div.append($p);
            $('.similarArtists').append($div);
        });
    }
    
    function displayAlbumDetails(parsedDetails) {
        parsedDetails.forEach(function (album) {
            var $div = $('<div>').addClass('artistDetail');
            var $p = $('<p>');
            var $a = $('<a>').attr('href', '#').text(album.name); 
            var $img = $('<img>').attr('src', album.imageSrc);
            $p.append($a);
            $div.append($img);
            $div.append($p);
            $('.artistAlbums').append($div);
        });
    }
    
    function clearPreviousArtistUIData() {

        $('.artistName, .similarArtists, .imageButtons, .artistAlbums, .trackNames').empty();
        $('.artistImage').prop('src', '');
        $('.artistDescription').text('');
    
}
   
})(dialog);


var parser = {};
(function(prs) {
    prs.parseRelevantArtistDetails = function (artistDetails, albums) {
        var description = parseArtistDescription(artistDetails);
        var similarArtists = parseSimilarArtistsDetails(artistDetails);
        var images = parseImageSizesAndSources(artistDetails);
        var albums = parseArtistAlbumsDetails(albums);
        
        return {
            name: artistDetails.name,
            images: images,
            similarArtists: similarArtists,
            description: description,
            albums: albums
        }
    }
    
    prs.parseAlbumTrackNames = function (album) {
        if ((typeof album == 'undefined') || album.tracks.track.length === 0) 
            return ["I couldn't find any tracks for this album"];
        
        return album.tracks.track.map(function(t) {
           return t.name; 
        });
    }
    
    function parseArtistAlbumsDetails (albums) {
        return albums.map(function(a) {
            return new Album(a.artist.name, a.name, a.image[1]['#text']);
        });
    }
    
    function parseArtistDescription(artist) {
        return artist.bio.summary;
    }
    
    function parseSimilarArtistsDetails(artistData) {
        return artistData.similar.artist.map(function(obj) {
            return new SimilarArtist(obj.name, obj.image[1]['#text']);
        });
    }
    
    function parseImageSizesAndSources(artist) {
        return artist.image.map(function(obj) {
            return new Image(obj.size, obj['#text']);        
        });
    }
    
    /**********data structures******************/
    
    function Image(size, source) {
        this.size = size;
        this.source = source;
    }

    function SimilarArtist(name, imageSrc) {
        this.name = name;
        this.imageSrc = imageSrc;
    }

    function Album(artistName, name, imageSrc) {
        this.artistName = artistName;
        this.name = name;
        this.imageSrc = imageSrc;
    }
})(parser);

var domain = {};
(function(dm) {
    
    dm.lookupArtist = function(name) {
        receiveArtistDetails(name, function(artist) {        
            dataContainsArtistDetails(artist,
                function itContains (validArtist) {
                    receiveArtistAlbums(name, function(albums) {
                        var artistDetails = parser.parseRelevantArtistDetails(validArtist, albums);
                        dialog.renderArtistDetails(artistDetails);
                    });                    
                },
                function itDoesNotContain () {
                    dialog.displayInvalidArtistMessage(name);
                }
            ) // end dataContainsArtistDetails
        }); // end receiveArtistDetails
    }
    
    dm.lookupAlbumTracks =  function(artist, albumName) {
        downloadAlbumTracksForArtist(artist, albumName, function(album) {
            var trackNames = parser.parseAlbumTrackNames(album);
            dialog.displayAlbumTrackNames(trackNames);
        });
    }
    
    function receiveArtistDetails(name, callback) {
        var cachedArtistDetails = artistDetailsCached(name);
        if (cachedArtistDetails) {
            callback(cachedArtistDetails);
        } else {
            downloadArtistDetails(name, function(data) {
                addArtistDetailsToCache(data.artist);
                callback(data.artist);
            });
        }
    }
    
    function dataContainsArtistDetails(artist, yesCallback, noCallback) {
        if (artist === undefined) {
            noCallback();
        } else {
            yesCallback(artist);
        }
    }
    
    function downloadArtistDetails(artistName, callback) {
        $lastfm.get({
            method: 'artist.getInfo',
            api_key: '91dcbbe75821abf1c3c43e4120573e99',
            artist: artistName,
            format: 'json'
        }, callback);
    }
    
    function downloadArtistAlbums(artistName, callback) {
        $lastfm.get({
            method: 'artist.getTopAlbums',
            api_key: '91dcbbe75821abf1c3c43e4120573e99',
            artist: artistName,
            format: 'json',
            limit: '10'
        }, callback);
    }
    
    function receiveArtistAlbums(artistName, callback) {
        var cachedArtistAlbums = artistAlbumsCached(artistName);
        
        if (cachedArtistAlbums) {
            callback(cachedArtistAlbums);
        } else {
            downloadArtistAlbums(artistName, function(data) {
                addArtistAlbumsToCache(data.topalbums.album);
                callback(data.topalbums.album);
            });
        }
    }
    
    function addArtistAlbumsToCache(albums) {
        if (typeof albums !== 'object') return false;
        downloadedAristAlbums.push(albums);
    }
    
    function artistAlbumsCached(name) {
        for (var i = 0; i < downloadedAristAlbums.length; i++) {
            var cachedAlbum = downloadedAristAlbums[i];

            if (name.toLowerCase() === cachedAlbum[0].artist.name.toLowerCase()) {
                return cachedAlbum;
            }
        }

        return false;
    }
    
    function downloadAlbumTracksForArtist(artistName, albumName, callback) {
        $lastfm.get({
            method: 'album.getInfo',
            api_key: '91dcbbe75821abf1c3c43e4120573e99',
            artist: artistName,
            album: albumName,
            format: 'json'
        }, function(data) {
            callback(data.album);                
        });
    }
    
    function artistDetailsCached(name) {
        for (var i = 0; i < downloadedAristDetails.length; i++) {
            var cachedArtist = downloadedAristDetails[i];

            if (name.toLowerCase() === cachedArtist.name.toLowerCase()) {
                return cachedArtist;
            }
        }

        return false;
    }
    
    function addArtistDetailsToCache(artist) {
        if (typeof artist == 'undefined') return false;
        downloadedAristDetails.push(artist);
    }
    
})(domain);

$('#searchArtistName').click(function() {
    var name = dialog.pullArtistNameFromUI();
    domain.lookupArtist(name);
});

$('.similarArtists').on('click', 'a', function() {
    var name = $(this).text(); // get artist name
    $('#artistNameInput').val(name); // update search box
    domain.lookupArtist(name);
});

$('.artistAlbums').on('click', 'a', function() {
    var albumName = $(this).text();
    var artistName = $('#artistNameInput').val();
    domain.lookupAlbumTracks(artistName, albumName);
    
});