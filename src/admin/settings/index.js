M.AutoInit();
function submit() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "data.php", true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = function () {
        // Call a function when the state changes.
        let json = JSON.parse(xhr.response);
        document.getElementById("memory_cost").value=json[0].value;
        document.getElementById("memory_cost").default=json[0].defaultValue;
        document.getElementById("memory_cost").min=(json[0].value/2);
        
        document.getElementById("threads").value=json[1].value;
        document.getElementById("threads").default=json[1].defaultValue;
        
        document.getElementById("time_cost").value=json[2].value;
        document.getElementById("time_cost").default=json[2].defaultValue;
        
    }
    xhr.send();
}
function setDefaultValue(name) {
    document.getElementById(name).value= document.getElementById(name).default;
    
}
submit();