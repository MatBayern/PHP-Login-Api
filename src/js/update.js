
if (sessionStorage.getItem("updateReminder") === null) {
    if (localStorage.getItem("remindLaterTime") === null || (Date.now() - localStorage.getItem("remindLaterTime")) >= 259200000) {  // 3 days
        checkVersions();
    }
}
//checks if a newer versions
function checkVersions() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '../api/version.php', true);
    xhr.setRequestHeader("Content-Type", "text/plain");
    xhr.onload = function () {
        let xhr2 = new XMLHttpRequest();
        xhr2.open('GET', 'https://raw.githubusercontent.com/MatBayern/PHP-Login-Api/master/VERSION', true);
        xhr2.onload = function () {
        if(xhr2.response!==xhr.response)
       {
        document.getElementById("new_version").innerText = xhr2.response;
        document.getElementById("old_version").innerText = xhr.response;
        sessionStorage.setItem("updateReminder", "true");
        let instance = M.Modal.getInstance(document.getElementById("update"));
        instance.open();
    }
        


    };
xhr2.send();

    };

    xhr.send();
}
function setRemindLaterTime(){
    localStorage.setItem("remindLaterTime",Date.now());
}
