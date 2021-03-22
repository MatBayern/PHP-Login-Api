M.AutoInit();

document.getElementById("submit").addEventListener("click", submit);

function submit() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let remember_me = document.getElementById("remember").checked;
    if (password !== "" && username !== "") {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'login.php', true);

        //Send the proper header information along with the request
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onload = function () { // Call a function when the state changes.
            let json = JSON.parse(xhr.response);
            if (json["error"] === false) {
                window.location.href = "admin";

            } else {
                M.toast({ html: "False credentials!" });
            }
            console.log(json);
        }
        xhr.send("username=" + username + "&password0=" + password +"&remember_me="+remember_me);
    }
}

console.log("loaded")