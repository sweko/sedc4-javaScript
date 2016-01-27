$(function() {
    $('#displayLisa').dialog({
        autoOpen: false,
        title: 'Details'
    });
    $('#openLisa').click(function() {
        $('#displayLisa').dialog('open');
        return false;
    });
    $('#displayTom').dialog({
        autoOpen: false,
        title: 'Details'
    });
    $('#openTom').click(function() {
        $('#displayTom').dialog('open');
        return false;
    });
    $("#deleteLisa").on('click', function(event) {
        $(this).parent().parent().remove();
    });
    $("#deleteTom").on('click', function(event) {
        $(this).parent().parent().remove();
    });
    $("tr").hover(
        function() {
            $(this).addClass("hover");
        },
        function() {
            $(this).removeClass("hover");
        }
    );
    // changes table data on click
    $('td.editable').on('click', function(event) {
        var jsonData = $(event.target).attr('rel');
        var OriginalData = $(this).text();

        $(this).html("<input type='text' value='" + OriginalData + "' rel='" + jsonData + "' />");
        $(this).children().first().focus();
        
        //press enter to save the changes
        $(this).children().first().keypress(function(e) {
            if (e.which == 13) {
                var newData = $(this).val();
                $(this).parent().text(newData);
                var relData = $.parseJSON($(e.target).attr('rel'));
            }
        });


        $(this).children().first().blur(function() {
            $(this).parent().text(OriginalData);
        });
    });


});