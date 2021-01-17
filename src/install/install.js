M.AutoInit();
document.getElementById("submit").addEventListener("click", submit);

onstart(true);

function submit() {
    let username = document.getElementById("dbUsername").value;
    let password = document.getElementById("dbPassword").value;
    let adress = document.getElementById("dbServeradress").value;
    let dbname = document.getElementById("dbName").value;

    if (username !== "" && adress !== "" && password !== "" && dbname !== "") {
        var xhr = new XMLHttpRequest();

        xhr.open("POST", 'install.php', true);

        //Send the proper header information along with the request
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onload = function () { // Call a function when the state changes.
            let json = JSON.parse(xhr.response);
            if (json["success"] === true) {
                alert("Successfully installed!");
                window.location.href = "admin/index.html";
            } else {

                alert(json["error"]);
            }
        }

        xhr.send("dbServername=" + adress + "&dbUsername=" + username + "&dbPassword=" + password + "&dbName=" + dbname);
    }
}
function onstart(firstStart = false) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'info.php', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () { // Call a function when the state changes.
        let json = JSON.parse(xhr.response);
        if (firstStart) {
            document.getElementById("code").innerHTML += json["processUser"] + " " + json["configPath"];
        }
        document.getElementById("phpVersion").innerHTML = "installed version: " + json["phpVersion"];
        document.getElementById("mychmodLoaded").innerHTML = "Current chmod status: " + json["configPermission"] + "<br>Current owner: " + json["configOwner"];
        if (json["phpVersionCompatible"] === true) {
            document.getElementById("phpIcon").innerHTML = "✅";
            document.getElementById("phpVersion").style.color = "#1faa00";
        } else {
            document.getElementById("phpIcon").innerHTML = "❌";
            document.getElementById("phpVersion").style.color = "#9b0000";
        }
        if (json["phpMysqliInstalled"] === true) {
            document.getElementById("mysqliIcon").innerHTML = "✅";
            document.getElementById("mysqliLoaded").style.color = "#1faa00";
        } else {
            document.getElementById("mysqliIcon").innerHTML = "❌";
            document.getElementById("mysqliLoaded").style.color = "#9b0000";
        }
        if (json["configWritable"] === true) {
            document.getElementById("mychmodIcon").innerHTML = "✅";
            document.getElementById("mychmodLoaded").style.color = "#1faa00";
        }
        else {
            document.getElementById("mychmodIcon").innerHTML = "❌";
            document.getElementById("mychmodLoaded").style.color = "#9b0000";
        }
        setTimeout(onstart, 1000);
    }
    xhr.send();
}