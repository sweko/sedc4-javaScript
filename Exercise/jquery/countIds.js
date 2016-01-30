(function () {
    $.fn.countIds = function () {
        var count = 0;
        $.each(this, function (index, item) {
            if ($(item).prop("id"))
                count++;
        });
        console.log(count);
        return this;
    };
})();