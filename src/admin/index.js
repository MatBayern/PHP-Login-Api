M.AutoInit();
M.Tooltip.init(document.getElementById("edit"), { margin: 20 });
M.Tooltip.init(document.getElementById("delete"), { margin: 20 });
M.Tooltip.init(document.getElementById("selectAll"), { margin: 20 });
M.Tooltip.init(document.getElementById("refresh"), { margin: 20 });


document.getElementById("submit").addEventListener("click", submit);
document.getElementById("searchUser").addEventListener("input", getTableData);
document.getElementById("limit").addEventListener("change", getTableData);
deleteUserId = [];

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
        for (var i = 0; i in json.user; i++) {
            //row
            var row = table.insertRow(i);
            row.setAttribute("id", json.user[i].ID);
            // cells
            var cell0 = row.insertCell(0);
            var cell1 = row.insertCell(1);
            var cell2 = row.insertCell(2);
            var cell3 = row.insertCell(3);


            // Set text
            cell1.innerText = json.user[i].user;
            if (json.user[i].permissions !== null) {
                cell2.innerText += json.user[i].permissions[0];
                for (var I = 1; I in json.user[i].permissions; I++) {
                    cell2.innerText += ", " + json.user[i].permissions[I];
                }
            }
            if (deleteUserId.includes(json.user[i].ID)) {
                cell0.innerHTML = '<label><input type="checkbox" onchange="addToDelete(this)" checked/><span></span></label>';
            } else {
                cell0.innerHTML = '<label><input type="checkbox" onchange="addToDelete(this)"/><span></span></label>';
            }
            cell3.innerText = json.user[i].creationDate;
            //cell4.innerHTML =
            //    '<i class="material-icons" style="color: #f44336; cursor: pointer;" onclick="confirmDelete(' + json[i].ID + ')">delete</i>';

        }
        selectedUser();
        displayedUser();
        document.getElementById("userCount").innerText = json.info.count;
    };

    xhr.send("limit=" + limit + "&search=" + search);

}

// added items to array that should be delete after confirm
function addToDelete(element) {
    if (element.checked) {
        deleteUserId.push(Number(element.parentNode.parentNode.parentNode.id));
        //console.log(deleteUserId);

    }
    else {
        var keyIndex = deleteUserId.indexOf(Number(element.parentNode.parentNode.parentNode.id));
        deleteUserId.splice(keyIndex, 1);
        //console.log(deleteUserId);
    }
    selectedUser();
}

function delTable() {
    document.getElementById("data").innerHTML = "";
}

function confirmDelete() {
    let instance = M.Modal.getInstance(document.getElementById("confirmDelete"));
    document.getElementById("confirmDeleteText").innerHTML = "Do you want to delete the following users:<br>";
    instance.open();
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "data.php", true);
    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //table
    xhr.onload = function () {
        let json = JSON.parse(xhr.response);
        // Call a function when the state changes.
        for (let index = 0; index in deleteUserId; index++) {
            //console.log(json.user[0][index]);
            // console.log(json.user[index].user); // halfen
            if (json.user[index] === null) {
                continue;
            }
            //table tag
            let tbl = document.createElement('table');
            let br = document.createElement('br');
            //tr tags
            let tr0 = document.createElement('tr');
            var tr1 = document.createElement('tr');
            //th
            let th0 = document.createElement('th');
            let th1 = document.createElement('th');
            let th2 = document.createElement('th');
            let th3 = document.createElement('th');
            //td tags
            let td0 = document.createElement('td');
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            let td3 = document.createElement('td');
            //th tags text
            th0.innerText = "User";//+  document.getElementById(deleteUserId[index]).childNodes[1].textContent;
            th1.innerText = "Permissions";
            th2.innerText = "Created";
            th3.innerText = "ID";
            th0.classList.add("center-align");
            th1.classList.add("center-align");
            th2.classList.add("center-align");
            th3.classList.add("center-align");
            //

            td0.innerText = json.user[index].user;
            td1.innerText = json.user[index].permissions.toString();
            td2.innerText = json.user[index].creationDate;
            td3.innerText = json.user[index].ID;
            td0.classList.add("center-align");
            td1.classList.add("center-align");
            td2.classList.add("center-align");
            td3.classList.add("center-align");
            //
            tr0.appendChild(th0);
            tr0.appendChild(th1);
            tr0.appendChild(th2);
            tr0.appendChild(th3);
            //
            tr1.appendChild(td0);
            tr1.appendChild(td1);
            tr1.appendChild(td2);
            tr1.appendChild(td3);
            //
            tbl.appendChild(tr0);
            tbl.appendChild(tr1);
            let p = document.getElementById("confirmDeleteText");
            //
            p.appendChild(tbl);
            p.appendChild(br);
        }

    };

    xhr.send("id=" + JSON.stringify(deleteUserId));
}
function StartEdit() {
    if (deleteUserId.length == 1) {
        let instance = M.Modal.getInstance(document.getElementById("editUser"));
        document.getElementById("edit_username").value = document.getElementById(deleteUserId[0]).childNodes[1].textContent;
        document.getElementById("edit_permission").value = document.getElementById(deleteUserId[0]).childNodes[2].textContent;
        instance.open();

    } else if (deleteUserId.length === 0) {
        M.toast({ html: "Please select one user" });
    } else {
        M.toast({ html: "You can only edit one user at once!" });
    }
}
function edit() {
    let username = document.getElementById("edit_username").value;
    let permissions = document.getElementById("edit_permission").value;
    let password0 = document.getElementById("edit_password0").value;
    let password1 = document.getElementById("edit_password1").value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "editUser.php", true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = function () {
        // Call a function when the state changes.
        let json = JSON.parse(xhr.response);

        if (json["error"] === true) {
            M.toast({ html: "User couldn´t be changed. " + json["errorMessage"] });
        } else {
            M.toast({ html: "Sucessfully changed!" });
            getTableData();
        }
    };

    xhr.send(
        "username=" + username +
        "&password0=" +
        password0 +
        "&password1=" +
        password1 +
        "&permissions=" +
        permissions
        +
        "&id=" +
        deleteUserId[0]

    );

}

function selectAll() {
    for (var i = 0; i in document.getElementById("data").childNodes; i++) {
        if (document.getElementById("data").childNodes[i].cells[0].childNodes[0].childNodes[0].checked) {
            document.getElementById("data").childNodes[i].cells[0].childNodes[0].childNodes[0].checked = false;
            addToDelete(document.getElementById("data").childNodes[i].cells[0].childNodes[0].childNodes[0]);
        } else {
            document.getElementById("data").childNodes[i].cells[0].childNodes[0].childNodes[0].checked = true;
            addToDelete(document.getElementById("data").childNodes[i].cells[0].childNodes[0].childNodes[0]);
            // hier
        }
    }

}

function del() {
    for (let i = 0; i in deleteUserId; i++) {
        let xhr = new XMLHttpRequest();
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
                getTableData();
            }
        };
        xhr.send("id=" + deleteUserId[i]);
    }
    deleteUserId = [];

}
function selectedUser() {
    document.getElementById("selectedUser").innerText = deleteUserId.length;
}
function displayedUser() {
    document.getElementById("displayedUser").innerText = document.getElementById("data").rows.length;
}



console.log("loaded");
getTableData();
selectedUser();
displayedUser();