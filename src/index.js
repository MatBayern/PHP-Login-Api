document.getElementById("submit").addEventListener("click", submit);

function submit() {
    console.log("test");

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'login.php', true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = function () { // Call a function when the state changes.
        let json = JSON.parse(xhr.response);
        if (json["login"] === true) {
            window.location.href = "test.html";
        }
        console.log(json);
    }
    xhr.send("username=" + username + "&password=" + password);
}

console.log("loaded")