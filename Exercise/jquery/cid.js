(function () {
    $.fn.id = function (newValue) {
        if (newValue === undefined) {
            //getting
            console.log("getting");
            var id = $(this).prop("id");
            return id;
        } else {
            //setting
            console.log("setting");
            if (typeof newValue === "string"){
                $(this).prop("id",newValue);
                return this;
            } else {
                throw new Error("Invalid value for id, not a valid string");
            }
        }
    };
})();