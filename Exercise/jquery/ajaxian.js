$(function(){
    $.ajax({
        url: 'http://ws.audioscrobbler.com/2.0/?method=artist.getInfo&api_key=91dcbbe75821abf1c3c43e4120573e99&artist=Metallica&format=json',
        data: null,
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function(data) { 
            $("#artistName").text(data.artist.name);
            var images = data.artist.image.filter(function(value){
                return value.size === "extralarge";
            });
            if (images.length !== 0){
                var image = images[0]; 
                $("#artistImage").prop("src", image["#text"]);
            }
            $("#artistBio").html(data.artist.bio.summary);
        },
        error: function() { alert('Failed!'); },
    });
});