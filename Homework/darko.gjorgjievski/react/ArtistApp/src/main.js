var Test = React.createClass({
    render: function() {
        return (
            <div>

            </div>
        );
    }
});
//----------------FUNCTIONS START HERE--------------------------------------//
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

    dm.lookupArtist = function(name, successCallback ,failCallback) {
        receiveArtistDetails(name, function(artist) {
            dataContainsArtistDetails(artist,
                function itContains (validArtist) {
                    receiveArtistAlbums(name, function(albums) {
                        var artistDetails = parser.parseRelevantArtistDetails(validArtist, albums);
                        successCallback(artistDetails);
                    });
                },
                function itDoesNotContain () {
                    failCallback;
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



//-----------------REACT CODE STARTS HERE----------------------------------
var Tracks = React.createClass({
    render: function() {
        return (
            <p></p>
        );
    }
});

var Album = React.createClass({
    getInitialState: function () {
        return { tracks: [], tracksFetched: false };
    },

    getTracks: function () {
        var result = ['lol', 'lmao', 'rofl'];
        this.setState({tracks: result, tracksFetched: true});
    },

    renderAlbumView: function () {
        return (
            <div className="artistDetail" onClick={this.getTracks}>
                <img src={this.props.imageSrc} />
                <p>{this.props.name}</p>
            </div>
        );
    },

    renderTracks: function () {
        return (
            <div className="artistDetail">
                <img src={this.props.imageSrc} />
                <p>{this.props.name}</p>
                {
                    this.state.tracks.map(function(t,i) {
                        return <p key={i}>{t}</p>
                    })
                }
            </div>
        )
    },

    render: function() {
        if (this.state.tracksFetched === false) {
            return this.renderAlbumView();
        } else {
            return (this.renderTracks())
        }
    }
});

var AlbumsContainer = React.createClass({

    render: function() {
        var component = this;
        return (
            <div className="artistAlbumsPlaceholder">
                <h1>{this.props.name}'s albums</h1>
                {
                    this.props.albums.map(function(albumDetails, id) {
                        return <Album key={id} imageSrc={albumDetails.imageSrc} name={albumDetails.name} artistName={albumDetails.artistName} />
                    })
                }
            </div>
        );
    }
});

var SearchForm = React.createClass({
    render: function() {
        return (
            <div>
                <input type="text" onChange={this.props.onInputChange} />
                <button onClick={this.props.onClick}>Search</button>
            </div>
        );
    }
});

var SearchResults = React.createClass({
    emptySearchResults: function () {
        return (<div></div>);
    },

    searchResults: function () {
        var fetchedData = this.props.fetchedData;
        console.log(fetchedData);
        return (
            <AlbumsContainer albums={fetchedData.albums} name={fetchedData.fetchedArtistName}/>

        )

    },


    render: function() {
        console.log(this.props.dataFetched);
        if (this.props.dataFetched === false) {
            return this.emptySearchResults();
        } else {
            return this.searchResults();
        }
    }
});

var App = React.createClass({
    getInitialState: function () {
        return {
            artistName: '',

            fetchedData: {
                fetchedArtistName: '',
                description: '',
                similarArtists: [],
                albums: []
            },

            dataFetched: false,
        };
    },

    changeArtistName: function (e) {
        this.setState({artistName: e.target.value});
    },

    search: function (event) {
        var component = this;
        domain.lookupArtist(this.state.artistName,
        function success(data) {
            component.setState({
                fetchedData: {
                    fetchedArtistName: component.state.artistName,
                    images: data.images,
                    similarArtists: data.similarArtists,
                    description: data.description,
                    albums: data.albums,
                },
                dataFetched: true
            });
        },
        function fail() {
            console.log('could not get data for artist');
        });
    },


    render: function() {
        return (
            <div>
                <SearchForm onInputChange={this.changeArtistName} onClick={this.search} />
                <SearchResults dataFetched={this.state.dataFetched} fetchedData={this.state.fetchedData}  />
            </div>
        );
    }
});

//var App = React.createClass({
//    render: function() {
//        return (
//            <div>
//
//            </div>
//        );
//    }
//});
ReactDOM.render(<App />, document.getElementById('container'));