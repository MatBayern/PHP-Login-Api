M.AutoInit();
document.getElementById("submit").addEventListener("click", submit);


function submit() {
    let memory_cost = document.getElementById("memory_cost").valueAsNumber;
    let threads = document.getElementById("threads").valueAsNumber;
    let time_cost = document.getElementById("time_cost").valueAsNumber;
    let register;
    let remember_me;

    if (document.getElementById("register").checked) {
        register = 1;
    } else {
        register = 0;
    }
    if (document.getElementById("remember_me").checked) {
        remember_me = 1;
    } else {
        remember_me = 0;
    }

    if (memory_cost < document.getElementById("memory_cost").default) {
        M.toast({ html: "Memory value are too low! " });
        return;
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "setSettings.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = function () {
        // Call a function when the state changes.
        let json = JSON.parse(xhr.response);

        if (json["error"] === true) {
            M.toast({ html: "Settings couldn't be changed. " + json["errorMessage"] });
        } else {
            M.toast({ html: "Sucessfully changed!" });
        }

    }
    xhr.send("memory_cost=" + memory_cost + "&threads=" + threads + "&time_cost=" + time_cost + "&register=" +register+"&remember_me="+remember_me);

}

function getValues() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "getSettings.php", true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = function () {
        // Call a function when the state changes.
        let json = JSON.parse(xhr.response);
        for (var i = 0; i in json; i++) {
            if (json[i].name === "register") {
                if (json[i].value === "0") {
                    document.getElementById("register").checked = false;
                } else {
                    document.getElementById("register").checked = true;
                }
                continue;
            }
            if (json[i].name === "remember_me") {
                if (json[i].value === "0") {
                    document.getElementById("remember_me").checked = false;
                } else {
                    document.getElementById("remember_me").checked = true;
                }
                continue;
            }
          
            document.getElementById(json[i].name).value = json[i].value;
            if (json[i].name == "memory_cost") {
                document.getElementById(json[i].name).min = json[i].defaultValue / 2;
            } 
            
            document.getElementById(json[i].name).default = json[i].defaultValue;
        }
        M.AutoInit();
    }
    xhr.send();
}

function setDefaultValue(name) {
    document.getElementById(name).value = document.getElementById(name).default;

}
getValues();