document.getElementById("submit").addEventListener("click", submit);

onstart();

function submit() {
    console.log("test");

    let username = document.getElementById("dbUsername").value;
    let password = document.getElementById("dbPassword").value;
    let adress = document.getElementById("dbServeradress").value;
    let dbname = document.getElementById("dbName").value;


    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'install.php', true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = function () { // Call a function when the state changes.
        let json = JSON.parse(xhr.response);
        if (json["success"] === true) {
            alert("Successfully installed!");
        } else {
           
            alert(json["error"]);
        }
    }
    xhr.send("dbServername=" + adress + "&dbUsername=" + username + "&dbPassword=" + password + "&dbName=" + dbname);
}
function onstart() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'info.php', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () { // Call a function when the state changes.
        let json = JSON.parse(xhr.response);
        document.getElementById("code").innerHTML += json["processUser"]+" "+json["configPath"];
        document.getElementById("phpVersion").innerHTML = "installed version:" + json["phpVersion"];
        document.getElementById("mychmodLoaded").innerHTML = "Current chmod status: " + json["configPermission"] + "<br>Current owner: "+ json["configOwner"];
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
        setTimeout(syncRequirements, 1000);
    }
    xhr.send();
}

function syncRequirements() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'info.php', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () { // Call a function when the state changes.
        let json = JSON.parse(xhr.response);
        document.getElementById("phpVersion").innerHTML = "installed version:" + json["phpVersion"];
        document.getElementById("mychmodLoaded").innerHTML = "Current chmod status: " + json["configPermission"] + "<br>Current owner: "+ json["configOwner"];
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
        setTimeout(syncRequirements, 1000);
    }
    xhr.send();
}