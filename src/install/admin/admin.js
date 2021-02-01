M.AutoInit();
document.getElementById("submit").addEventListener("click", submit);
function submit() {
    let username = document.getElementById("username").value;
    let password0 = document.getElementById("password0").value;
    let password1 = document.getElementById("password1").value;
    if (password1 !== password0) {
        
        document.getElementById("password1").classList.remove("valid");
        document.getElementById("password0").classList.remove("valid");
        document.getElementById("password1").classList.add("invalid");
        document.getElementById("password0").classList.add("invalid");
    } else {
        document.getElementById("password1").classList.remove("invalid");
        document.getElementById("password0").classList.remove("invalid");
        document.getElementById("password1").classList.add("valid");
        document.getElementById("password0").classList.add("valid");
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'registerAdmin.php', true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () { // Call a function when the state changes.
        let json = JSON.parse(xhr.response);
        if (json["error"] === true) {
            M.toast({ html: "User couldn´t be created. " + json["errorMessage"] });
        } else {
            M.toast({ html: 'Sucessfully installed!' });
    }
}
    xhr.send("username=" + username + "&password0=" + password0 + "&password1=" + password1);
}
