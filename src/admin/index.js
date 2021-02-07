
document.getElementById("submit").addEventListener("click", submit);

function submit() {
    let username = document.getElementById("username").value;
    let password0 = document.getElementById("password0").value;
    let password1 = document.getElementById("password1").value;
    let permissions = document.getElementById("permission").value;

   
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'addUser.php', true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = function () { // Call a function when the state changes.
        let json = JSON.parse(xhr.response);
        
        if (json["error"] === true) {
            M.toast({ html: "User couldn´t be created. " + json["errorMessage"] });
        } else {
            M.toast({ html: 'Sucessfully installed!' });
            window.location.href = "../";
        }

    }  
     
    xhr.send("username=" + username + "&password0=" + password0+ "&password1=" + password1+ "&permissions=" + permissions);
}
function OnStart() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'data.php', true);

    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//table
var table = document.getElementById("data");


    xhr.onload = function () { // Call a function when the state changes.
        let json = JSON.parse(xhr.response);
        for(var i=0;i in json;i++){
            //row
            var row = table.insertRow(i);
            // cells
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            // Set text 
            cell1.innerText = json[i].user;
            if(json[i].permissions!==null)
            {
                cell2.innerText +=  json[i].permissions[0];
                for(var I=1;I in json[i].permissions;I++)
                    {
                        cell2.innerText +=  ", "+json[i].permissions[I];
                    }
            
            }
            cell3.innerText = json[i].creationDate;
            cell4.innerHTML = "<i class=\"material-icons\" style=\"color: #f44336;\" onclick=\"del(" + json[i].ID + ")\">delete</i>";
       
        
      
        }
        
       
    }
    xhr.send();

}

console.log("loaded");
OnStart();