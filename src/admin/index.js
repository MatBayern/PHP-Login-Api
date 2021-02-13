M.AutoInit();
document.getElementById("submit").addEventListener("click", submit);
document.getElementById("searchUser").addEventListener("input",getTableData);
document.getElementById("limit").addEventListener("change",getTableData);

function submit() {
    let username = document.getElementById("username").value;
    let password0 = document.getElementById("password0").value;
    let password1 = document.getElementById("password1").value;
    let permissions = document.getElementById("permission").value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "addUser.php", true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = function () {
        // Call a function when the state changes.
        let json = JSON.parse(xhr.response);

        if (json["error"] === true) {
            M.toast({ html: "User couldn´t be created. " + json["errorMessage"] });
        } else {
            M.toast({ html: "Sucessfully created!" });
            getTableData();
        }
    };

    xhr.send(
        "username=" +
        username +
        "&password0=" +
        password0 +
        "&password1=" +
        password1 +
        "&permissions=" +
        permissions
    );
}
function getTableData() {
   
    let limit = document.getElementById("limit").value;
    let search = document.getElementById("searchUser").value;
    var xhr = new XMLHttpRequest();
    
    xhr.open("POST", "data.php", true);
    
    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //table
    var table = document.getElementById("data");

    xhr.onload = function () {
        delTable();
        // Call a function when the state changes.
        let json = JSON.parse(xhr.response);
        for (var i = 0; i in json; i++) {
            //row
            var row = table.insertRow(i);
            row.setAttribute("id", json[i].ID);
            // cells
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            // Set text
            cell1.innerText = json[i].user;
            if (json[i].permissions !== null) {
                cell2.innerText += json[i].permissions[0];
                for (var I = 1; I in json[i].permissions; I++) {
                    cell2.innerText += ", " + json[i].permissions[I];
                }
            }
            cell3.innerText = json[i].creationDate;
            cell4.innerHTML =
                '<i class="material-icons" style="color: #f44336; cursor: pointer;" onclick="confirmDelete('+json[i].ID+')">delete</i>';
        }
    };
    xhr.send("limit="+limit+"&search="+search);
}
function delTable()
{
    document.getElementById("data").innerHTML = "";
}
function confirmDelete(id)
{
    let instance = M.Modal.getInstance(document.getElementById("confirmDelete"));
    instance.open();
    //Add table elment
    document.getElementById("confirmDelete1").innerText =  document.getElementById(id).childNodes[1].textContent;
    document.getElementById("confirmDelete0").innerText = document.getElementById(id).childNodes[0].textContent;
    document.getElementById("confirmDelete2").innerText = document.getElementById(id).childNodes[2].textContent;
    document.getElementById("confirmDelete3").innerText = id;
    //document.getElementById("confirmDeleteText").innerText= document.getElementById(id).childNodes[0].textContent;
    deleteUserId = id;
    
}
function del() {
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "delUser.php", true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = function () {
        // Call a function when the state changes.
        let json = JSON.parse(xhr.response);
        if (json["error"] === true) {
            M.toast({ html: "User couldn´t be removed. " + json["errorMessage"] });
        } else {
            M.toast({ html: "Sucessfully removed!" });
        document.getElementById(deleteUserId).remove();
        }
    };

    xhr.send("id=" + deleteUserId);
}

console.log("loaded");
document.getElementById("confirmDelete1").innerText
getTableData();