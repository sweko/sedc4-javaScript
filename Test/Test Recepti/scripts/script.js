function Recept(recept, izvor, sostojki, vreme) {
    this.recept = recept;
    this.izvor = izvor;
    this.sostojki = sostojki;
    this.vreme = vreme;
}

function Sostojka(name, quantity) {
    this.name = name;
    this.quantity = quantity;
}


$(document).ready(function() {
    $("#accordion").accordion({
        collapsible: true
    });


    var recepti = [];

    var id = 1;
    var submitForm = $("#submitForm");
    var recept = $("#recept");
    var izvor = $("#izvor");
    var sostojki = $("#dodadiSostojki");
    var vreme = $("#vreme");
    var nacin = $("#nacin");
    var sostojkiTable = $("#sostojkiTable");
    console.log(recept.val());

    $("#submitSostojka").click(function(e) {
        e.preventDefault();
        var name = $("#sostojki").val();
        var quantity = $("#kolicina").val();
        var sostojka = new Sostojka(name, quantity);
        console.log(sostojka);
        sostojki.push(sostojka);
        var tr = $("<tr></tr>");
        tr.append($("<td>" + sostojka.name + "</td>"));
        tr.append($("<td>" + sostojka.quantity + "</td>"));
        sostojkiTable.append(tr);
        return false;
    });

    submitForm.on("click", function(e) {
        e.preventDefault();

        if (recept.val() == "" || izvor.val() == "" || sostojki.val() == "" || vreme.val() == "") {
            alert("Popolnete gi praznite polinja");
        } else {
            var novRecept = new Recept(recept.val(), izvor.val(), sostojki.val(), vreme.val());
            recepti.push(novRecept);
            var newTableRow = $("<tr>");
            var imeNaRecept = $("<td>");
            var izvorNaRecept = $("<td>");
            var listaNaSostojki = $("<td>");
            var vremeNaPodgotovka = $("<td>");
            var nacinNaPodgotovka = $("<td>");
            var $showButton = $("<button>");
            var $deleteButton = $("<button>");

            imeNaRecept.text(recept.val());
            izvorNaRecept.text(izvor.val());
            listaNaSostojki.text(sostojki.val());
            vremeNaPodgotovka.text(vreme.val() + " " + "minuti");
            nacinNaPodgotovka.text(nacin.val());
            var karakteri = nacinNaPodgotovka.text();

            if (karakteri.length > 50) {
                nacinNaPodgotovka.text(karakteri.substring(0, 50));
            } else {
                nacinNaPodgotovka.text(karakteri);
            }
            newTableRow.append("<td>" + id + "</td>");
            id++;
            newTableRow.append(imeNaRecept);
            newTableRow.append(izvorNaRecept);
            newTableRow.append(listaNaSostojki);
            newTableRow.append(vremeNaPodgotovka);
            newTableRow.append(nacinNaPodgotovka)
            newTableRow.append($showButton);
            newTableRow.append($deleteButton);


            $showButton.attr({
                class: "btn btn-success show",
                name: "showData",
                type: "submit",
            });
            $deleteButton.attr({
                class: "btn btn-danger deleteRow",
                name: "deleteData",
                type: "submit"
            });
            $deleteButton.text("Delete");
            $showButton.text("Display");
            $("#mainTable").append(newTableRow);
            $("#accordion").accordion("option", "active", 1);

        }

        $(".deleteRow").click(function() {
            $(this).closest("tr").remove();
        });

        $(".show").click(function() {
            $("#iscitaj").empty();
            var pZaIme = $("<p>");
            var pZaIzvor = $("<p>");
            var pZaSostojki = $("<p>");
            var pZaVreme = $("<p>");
            var pZaNacin = $("<p>");

            pZaIme.append("Ime na receptot :" + " " + imeNaRecept.text());
            pZaIzvor.append("Izvor na receptot :" + " " + izvorNaRecept.text());
            pZaSostojki.append("Sostojki za receptot :" + " " + listaNaSostojki.text());
            pZaVreme.append("Vreme na podgotovka :" + " " + vremeNaPodgotovka.text());
            pZaNacin.append("Nacin na podgotovka :" + " " + karakteri);

            $("#iscitaj").append(pZaIme).append(pZaIzvor).append(pZaSostojki).append(pZaVreme).append(pZaNacin);
            $("#accordion").accordion("option", "active", 2);

        });


    });




});