(function () {
    $.fn.extract = function () {
        $.each(this, function (index, itemDom) {
            var item = $(itemDom);
            var text = item.text();
            var blurb = text.substring(0, 50);
            item.empty();

            var contractDiv = $("<div>");
            contractDiv.text(blurb);

            var showAll = $("<span>");
            showAll.prop("title", "Show all");
            showAll.click(function () {
                contractDiv.hide();
                fullDiv.show();
            });
            showAll.text("...");
            showAll.css("cursor", "pointer");
            contractDiv.append(showAll);
            contractDiv.appendTo(item);

            var fullDiv = $("<div>");
            fullDiv.text(text);
            fullDiv.css("display", "none");

            var showLess = $("<span>");
            showLess.prop("title", "Show less");
            showLess.click(function () {
                contractDiv.show();
                fullDiv.hide();
            });
            showLess.text("<<<");
            showLess.css("cursor", "pointer");
            fullDiv.append(showLess);
            fullDiv.appendTo(item);
        });
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
