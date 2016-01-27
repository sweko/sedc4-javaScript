var contacts = [{
    id: 1,
    name: "Wekoslav Stefannovski",
    email: "swekster@gmail.com",
    phone: "38978499695",
    state: "display",
}, {
    id: 2,
    name: "Orce Petreski",
    email: "orce@example.com",
    phone: "12345",
    state: "edit",
}];

$(function () {
    $("#saveContact").click(function () {
        var name = $("#inputForm #name").val();
        var email =$("#inputForm #email").val();
        var phone =$("#inputForm #phone").val();
        var id = Math.max.apply(null, contacts.map(function(c){return c.id;}))+1;
        contacts.push({
            id: id,
            name:name,
            email:email,
            phone:phone,
            state: 'display'
        });
       displayContacts(); 
    });

    $("#closeContact").click(function () {
        $("#viewer").hide();
    });

    displayContacts();
    $("#viewer").hide();
});

function displayContacts() {
    var table = $("#contactContainer");
    table.empty();
    $(contacts).each(function (i, item) {
        var row = $("<tr>");
        row.data("id",item.id);
        row.appendTo(table);
        if (item.state === "display") {
            renderViewContact(row, item);
        } else if (item.state === "edit") {
            renderEditContact(row, item);
        }
    });
}

function renderViewContact(row, contact) {
    row.empty();
    row.append("<td>" + contact.name + "</td>");
    row.append("<td>" + contact.email + "</td>");
    row.append("<td>" + contact.phone + "</td>");
    var readBtn = $("<button>Read</button>");
    readBtn.click(function () {
        $("#viewer").show();
        showContact(contact);
    });
    var updateBtn = $("<button>Update</button>");
    updateBtn.click(function () {
        renderEditContact(row, contact);
    });
    var deleteBtn = $("<button>Delete</button>");
    deleteBtn.click(function () {
        var id = row.data("id");
        var index = contacts.findIndex(function(c){return c.id===id;});
        contacts.splice(index, 1);
        displayContacts();
    });
    var buttons = $("<td>").append(readBtn).append(" ").append(updateBtn).append(" ").append(deleteBtn);
    row.append(buttons);
}

function renderEditContact(row, contact) {
    row.empty();
    var cell = $("<td>");
    $("<input>").attr("id", "edit-name").val(contact.name).appendTo(cell);
    cell.appendTo(row);

    cell = $("<td>");
    $("<input>").attr("id", "email-" + contact.id).val(contact.email).appendTo(cell);
    cell.appendTo(row);

    cell = $("<td>");
    $("<input>").attr("id", "phone-" + contact.id).val(contact.phone).appendTo(cell);
    cell.appendTo(row);
    var readBtn = $("<button>Read</button>");
    readBtn.click(function () {
        $("#viewer").show();
        showContact(contact);
    });
    var saveBtn = $("<button>Save</button>");
    saveBtn.click(function () {
        contact.name = row.find("#edit-name").val();
        contact.email = $("#email-" + contact.id).val();
        contact.phone = $("#phone-" + contact.id).val();
        renderViewContact(row, contact);
    });
    var deleteBtn = $("<button>Delete</button>");
    deleteBtn.click(function () {
        var id = row.data("id");
        var index = contacts.findIndex(function(c){return c.id===id;});
        contacts.splice(index, 1);
        row.remove();
        //displayContacts();
    });
    var buttons = $("<td>").append(readBtn).append(" ").append(saveBtn).append(" ").append(deleteBtn);
    row.append(buttons);
}

function showContact(contact) {
    $("#viewer #name").text(contact.name);
    $("#viewer #email").text(contact.email);
    $("#viewer #phone").text(contact.phone);
}