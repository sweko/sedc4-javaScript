(function () {
    $.fn.extract = function (parameter) {
        var self = this;
        var methods = ["expand", "contract", ];

        if (typeof parameter === "string") {
            if (methods.indexOf(parameter)) {
                $.each(self, function(index, item){
                    methodsImpl[parameter]($(item));    
                });
            } else {
                throw new Error("invalid method name");
            }
            return;
        }

        var methodsImpl = {
            expand: function (element) {
                //expand the element
            },
            contract: function (element) {
                //contract the element
            }
        };
        
        var nullFunction =function(){}; 
        var trueFunction =function(){return true;};
         
        var defaults = {
            charCount: 50,
            showLessTitle: "Show less",
            showAllTitle: "Show all",
            showLessText: "<<<",
            showAllText: "...",
            onExpand: nullFunction,
            beforeExpand: trueFunction,
            onContract: nullFunction,
        };
        var settings = $.extend({}, defaults, parameter);

        console.log(settings);
        init();

        function init() {
            $.each(self, function (index, itemDom) {
                var item = $(itemDom);
                var text = item.text();
                var blurb = text.substring(0, settings.charCount);
                item.empty();

                var contractDiv = $("<div>");
                contractDiv.text(blurb);

                var showAll = $("<span>");
                showAll.prop("title", settings.showAllTitle);
                showAll.click(function () {
                    if (settings.beforeExpand()){
                        contractDiv.hide();
                        fullDiv.show();
                        settings.onExpand();
                    }
                });
                showAll.text(settings.showAllText);
                showAll.css("cursor", "pointer");
                contractDiv.append(showAll);
                contractDiv.appendTo(item);

                var fullDiv = $("<div>");
                fullDiv.text(text);
                fullDiv.css("display", "none");

                var showLess = $("<span>");
                showLess.prop("title", settings.showLessTitle);
                showLess.click(function () {
                    contractDiv.show();
                    fullDiv.hide();
                    settings.onContract();
                });
                showLess.text(settings.showLessText);
                showLess.css("cursor", "pointer");
                fullDiv.append(showLess);
                fullDiv.appendTo(item);
            });
        }
    };
})();

    // <div id="start">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima beatae illum qui nobis a voluptatum ab ullam tempore
    //     accusantium quasi neque dolorum nostrum ipsum sunt aspernatur, amet error rerum, praesentium.</div>


    /* 
    <div id="start">
        <div>Cupiditate deleniti, quisquam unde, minima <span title="Show all" style="cursor:pointer" onclick="showAll()">...</span></div>        
    </div>
*/

    // <div id="finish">
    //     <div id="test">Cupiditate deleniti, quisquam unde, minima <span title="Show all" style="cursor:pointer" onclick="showAll()">...</span></div>
    //     <div id="test2" style="display:none">Cupiditate deleniti, quisquam unde, minima id in cumque voluptates labore libero pariatur exercitationem voluptas
    //         aspernatur asperiores repellendus est placeat saepe fugiat veritatis beatae magnam officiis vero. Ea, sit, blanditiis.
    //         <span title="Show less" style="cursor:pointer" onclick="showLess()">&lt;&lt;&lt;</span>
    //     </div>
    // </div>
