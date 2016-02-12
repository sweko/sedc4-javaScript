function Recipe($recipeName, $recipeSource, $timeForPreparation, $howIsDone, $sostojki, $id) {
    this.$id = $id;
    this.$recipeName = $recipeName;
    this.$recipeSource = $recipeSource;
    this.$timeForPreparation = $timeForPreparation;
    this.$howIsDone = $howIsDone;
    this.$sostojki = $sostojki;
} // objekt za recept

//objekt za sostojkite ( kolicina i sostojka)
function Sostojka($name, $quantity){
    this.$name = $name;
    this.$quantity = $quantity;
}

$(document).ready(function(){
    var recipes = [];
    var sostojki = [];
    var $id = 0;
    $( "#tabs" ).tabs();
    var $id = $id;
    var $tableRow = $("#tableRow");
    var $recipeName = $("#recipeName");
    var $recipeSource = $("#recipeSource");
    var $listThings = $("#listThings");
    var $timeForPreparation = $("#timeForPreparation");
    var $howIsDone = $("#howIsDone");
    var $sostojkiTable = $("#sostojkiTable");
    var $submitForm = $("#submitForm");

    $("#submitSostojka").on("click",function(e){
        e.preventDefault();
        var name = $("#sostojki").val();
        var quantity = $("#kolicina").val();
        var sostojka = new Sostojka(name, quantity);
        console.log(sostojka);
        sostojki.push(sostojka);
        var $tr = $("<tr>");
        $tr.append($("<td>"+sostojka.$name+"</td>"));
        $tr.append($("<td>"+sostojka.$quantity+"</td>"));
        $sostojkiTable.append($tr);

    });

    $submitForm.on("click", function(e){
        e.preventDefault();

        var $tdId = $("<td>");
        var $newTableRow = $("<tr>");
        var $tdRecipeName = $("<td>");
        var $tdRecipeSource = $("<td>");
        var $tdRecipeCount = $("<td>");
        var $tdRecipeSostojki = $("<td>");
        var $tdListThings = $("<td>");
        var $tdTimeForPreparation = $("<td>");
        var $tdHowIsDone = $("<td>");
        var $tableId = $("#tableId");
        var $tdShowButton = $("<td>")
        var $tdDeleteButton = $("<td>");
        var $showButton = $("<button>");
        var $deleteButton = $("<button>");


        $showButton.attr({
            class:"btn btn-default",
            name:"showData",
            type:"submit",
        });
        $deleteButton.attr({
            class:"btn btn-danger",
            name:"deleteData",
            type:"submit"
        });
        $deleteButton.text("Delete");
        $showButton.text("Display");
        $tdDeleteButton.append($deleteButton);
        $tdShowButton.append($showButton);
        $tdId.append($id);
        $id++;
        console.log($tdId.val());

        if($recipeName.val() == "" || $timeForPreparation.val()=="" || $howIsDone.val()=="" || sostojki.length==0){
            alert("Vnesete ime , lista,vreme kako broj i nacin na podgotovka");
        }else{
            var recipe = new Recipe($recipeName.val(), $recipeSource.val(), $timeForPreparation.val(), $howIsDone.val(), sostojki.slice(0, sostojki.length), $id);
            recipes.push(recipe);
            // Isprazni ja listata so sostojki
            sostojki = [];
            // Isprazni ja tabelata so sostojki
            $sostojkiTable.find("tr").not(":eq(0)").remove();
            console.log(recipes);


            if($timeForPreparation.val() < 60){
                $tdTimeForPreparation.append($timeForPreparation.val() + " minutes");
            }else if($timeForPreparation.val() >59){
                var $temp1,$temp2;
                $temp1 =    Math.floor($timeForPreparation.val()/60);
                $temp2 = $timeForPreparation.val() - ($temp1*60);

                if($temp2 ==0){
                    $tdTimeForPreparation.append($temp1 + " hours");
                }else{
                    $tdTimeForPreparation.append($temp1 + " hours and " + $temp2  + " minutes");
                }

            }

            var sostojkiFormatted = "";

            if(recipe.$sostojki.length < 3){
                for(var i=0; i<recipe.$sostojki.length; i++){



                    if(i == recipe.$sostojki.length-1){
                        sostojkiFormatted += recipe.$sostojki[i].$name + "";
                        break;
                    }else{
                        sostojkiFormatted += recipe.$sostojki[i].$name + ",";
                    }

                }
            }
            else{
                for(var i=0; i < 3; i++){

                    sostojkiFormatted += recipe.$sostojki[i].$name;
                    if(i < 2){
                        sostojkiFormatted += ", ";
                    }
                    else{
                        sostojkiFormatted += "...";
                    }
                }
            }


            var $howIsDoneFormatted = "";
            var $changed = $howIsDone.val();
            $tdHowIsDone.attr({
               "data-text": $changed
            });
            if($changed.length > 50){
              $howIsDoneFormatted =
                $tdHowIsDone.append($changed.substring(0,50));
                $tdHowIsDone.append("...");
            }else{
                $tdHowIsDone.append($howIsDone.val());
            }
            $tdRecipeName.append($recipeName.val());
            $tdRecipeSource.append($recipeSource.val());
            $tdRecipeCount.append(recipe.$sostojki.length);
            $tdRecipeSostojki.append(sostojkiFormatted);
            $tdListThings.append($listThings.val());


            // site table data gi dodavam na table row.

            $newTableRow.append($tdId);
            $newTableRow.append($tdRecipeName);
            $newTableRow.append($tdRecipeSource);
            $newTableRow.append($tdRecipeCount);
            $newTableRow.append($tdRecipeSostojki);
            $newTableRow.append($tdTimeForPreparation);
            $newTableRow.append($tdHowIsDone);
            $newTableRow.append($tdShowButton);
            $newTableRow.append($tdDeleteButton);
            // noviot table row na tabelata
            $tableId.append($newTableRow);
        }

        $showButton.on("click", function(e){
            e.preventDefault();
            var $tab3 = $("#tab3");
            var $tab3ParagraphId = $("<p>");
            var $tab3ParagraphName= $("<p>");
            var $tab3ParagraphSource = $("<p>");
            var $tab3ParagraphCount = $("<p>");
            var $tab3ParagraphSostojki = $("<p>");
            var $tab3ParagraphTimeForPreparation = $("<p>");
            var $tab3ParagraphHowIsDone = $("<p>");

            $tab3ParagraphId = $tdId.text();
            $tab3ParagraphName = $tdRecipeName.text();
            $tab3ParagraphSource = $tdRecipeSource.text();
            $tab3ParagraphCount = $tdRecipeCount.text();

            for(i=0;i<recipe.$sostojki.length;i++){
                $tab3ParagraphSostojki.html(function(){
                    return $tab3ParagraphSostojki.html() + "<br/>" + recipe.$sostojki[i].$name;
                })
            }

            $tab3ParagraphTimeForPreparation = $tdTimeForPreparation.text();
            $tab3ParagraphHowIsDone = $tdHowIsDone.attr("data-text");
            $tab3.remove();
            $("#tabs-3").append("<div id='tab3'></div>");
            $tab3 = $("#tab3");
            $tab3.attr({
               style:"background-color:yellow" //ima i css (x
            });
            $tab3.append($tab3ParagraphId);
            $tab3.append("<br>");
            $tab3.append($tab3ParagraphName);
            $tab3.append("<br>");
            $tab3.append($tab3ParagraphSource);
            $tab3.append("<br>");
            $tab3.append($tab3ParagraphCount);
            $tab3.append("<br>");
            $tab3.append($tab3ParagraphSostojki);
            $tab3.append("<br>");
            $tab3.append($tab3ParagraphTimeForPreparation);
            $tab3.append("<br>");
            $tab3.append($tab3ParagraphHowIsDone);

            //$showButton.prop('disabled', true);


        });
        $deleteButton.on("click", function(e){
            e.preventDefault();
            var $temp = confirm("Are you sure");

            if($temp == true) {
                $(this).closest("tr").remove();
            }else{
                //
            }
            //$newTableRow.hide();
            var $tab3 = $("#tab3");
            $tab3.remove();
            $("#tabs-3").append("<div id='tab3'></div>");
            $tab3 = $("#tab3");

        });


        $('#formView')[0].reset(); //
    });



});
