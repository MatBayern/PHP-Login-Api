function addModal()
{
    //create div tags
    var div0 = document.createElement("div");
    var div1 = document.createElement("div");
    var div2 = document.createElement("div");
    //create h4 tag
    var h4 = document.createElement("h4");
    //create p tag
    var p = document.createElement("p");
    //create atag
    var a = document.createElement("a");
    //css div0
    div0.classList.add("modal");
    div0.id="login_modal";
    //css div1
    div1.classList.add("modal-content");
    //css h4
    h4.innerText="Session is expired!";
    //css p
    p.innerText="Your login session expired. Please login again!";
    //css div2
    div2.classList.add("modal-footer");
    //css a
    a.classList.add("modal-close");
    a.classList.add("waves-effect");
    a.classList.add("waves-green");
    a.classList.add("btn-flat");
    a.innerText="Ok";
    a.href="/";
    //append elemnts to body reference https://materializecss.com/modals.html
    document.body.appendChild(div0);
    div0.appendChild(div1);
    div1.appendChild(h4);
    div1.appendChild(p);
    div0.appendChild(div2);
    div2.appendChild(a);
    //reload evrything
    M.AutoInit();
}

function submit() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../checkLogin.php", true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = function () {
        // Call a function when the state changes.
        let json = JSON.parse(xhr.response);

        if (!json["login"]) {
            let instance = M.Modal.getInstance(document.getElementById("login_modal"));
               instance.open();
        }
        
    };

    xhr.send();
}
addModal();
submit();