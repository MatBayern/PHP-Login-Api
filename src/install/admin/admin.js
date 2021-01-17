M.AutoInit();
document.getElementById("submit").addEventListener("click", submit);
function submit() {
    console.log("test");

    let username = document.getElementById("username").value;
    let password0 = document.getElementById("password0").value;
    let password1 = document.getElementById("password1").value;
    if (password1 !== password0) {
        console.log("kokok")
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
}