M.AutoInit();
function submit() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "data.php", true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = function () {
        // Call a function when the state changes.
        let json = JSON.parse(xhr.response);
        console.log(json);

    }
    xhr.send();
}
submit();