var modal = document.getElementById("myModal");

var login = document.getElementById("login");
var login_container = document.getElementById("login-widget-container");

var logout = document.getElementById("logout");
var logout_container = document.getElementById("logout-widget-container");

var filter = document.getElementById("filter");
var filter_container = document.getElementById("filter-container");

var profile = document.getElementById("profile");
var profile_widget_container = document.getElementById("profile-widget-container");
var profile_container = document.getElementById("profile-container");

var add_me = document.getElementById("add-me");
var add_me_container = document.getElementById("addme-widget-container");

var remove_me = document.getElementById("remove-me");
var remove_me_container = document.getElementById("removeme-widget-container");

var name_container = document.getElementById("name-container");

var login_signup_container = document.getElementById("login-signup-container");
var message_container = document.getElementById("message-container");
var message_text = document.getElementById("message-text");


var form_name = document.getElementById("form-name");

var form_company = document.getElementById("form-company");
var form_company_name = document.getElementById("form-company-name");

var form_role = document.getElementById("form-role");
var form_experience = document.getElementById("form-experience");

var form_sponsorship_yes = document.getElementById("form-sponsorship-yes");
var form_sponsorship_no = document.getElementById("form-sponsorship-no");

var form_visa_type = document.getElementById("form-visa-type");
var form_date  = document.getElementById("form-date");

var form_country = document.getElementById("form-country");
var form_linkedin = document.getElementById("form-linkedin");

var form_email_yes = document.getElementById("form-email-yes");
var form_email_no = document.getElementById("form-email-no");

var alert_container = document.getElementById("alert-container");
var alert_box = document.getElementById("alert-box");
var alert_close = document.getElementById("alert-close");

var span = document.getElementsByClassName("close")[0];

var form_layoff_yes = document.getElementById("layoff-yes");
var form_layoff_no = document.getElementById("layoff-no");



function callInitAPI(data){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data )
    };

    fetch('https://hmbxl63ne3.execute-api.us-east-1.amazonaws.com/addme', requestOptions)
        .then(response => response.json())
        .then(function(d) {
            result = JSON.parse(d["result"]);
            let is_profile_created = result["profile"];
            let is_added = result["is-added"];
            console.log("initialization api...");
            console.log(is_profile_created);
            console.log(is_added);
            if (is_profile_created){
                localStorage.setItem("layoffs_life_profile", JSON.stringify(result["profile-data"]));
            }
            if(is_added){
                remove_me_container.style.display = "flex";
            }
            else{
                add_me_container.style.display = "flex";
            }
           
    } );
}

function init(){
   
    let data = JSON.parse(localStorage.getItem('layoffs_life'));
    if(data == null || (!("email"  in data) && !("password" in data)) ){
        add_me_container.style.display = "none";
        remove_me_container.style.display = "none";
        profile_widget_container.style.display = "none";
        logout_container.style.display = "none";
        login_container.style.display = "flex";
        name_container.style.display = "none";
    }
    else{
       


        profile_widget_container.style.display = "flex";
        logout_container.style.display = "flex";
        login_container.style.display = "none";
        
        name_container.style.display = "flex";
        document.getElementById("name-span-text").innerHTML = data["email"];

        data["action"] = "init";
        callInitAPI(data);

        
    }
    
  
}


init();

function dateDifference(date2){
    const date1 = new Date();
    date2 = new Date(date2);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays;
}

var directoryData = null;

function loadDirectory(data){
    
    document.getElementById("participant-list").innerHTML= "";
    if(data == undefined){
        alert_container.style.display = "flex";
                alert_box.style.backgroundColor = 'lightcoral';
                alert_close.style.backgroundColor= 'lightcoral';
                alert_box.innerHTML = "No data to display";
                return;
    }
    data =JSON.parse(data);
    
    columns = ["name", "company", "role", "experience", "sponsorship", "visa-type", "days-remaining", "country", "linkedin", "email"];
    options = ["f", "f", "f", "s", "s", "s", "s", "s", "s", "f"];
    
    let company = null;
    let country = null;
    let filter = JSON.parse(localStorage.getItem("layoffs_life_filter"));
    if(filter != null){
        company = filter["company"];
        country = filter["country"];

    
    }
    
   
    for (key in data){

            let row = data[key];
            console.log(row);
            let participant = document.createElement("div");
            participant.setAttribute("class","participant");
            let add = true;
            for(var i =0; i<columns.length; i++){
              
                let value = row[columns[i]];
                console.log(value);
                if (value != undefined && value.length == 0){
                    value = "-";
                }
            
                let containerElement = document.createElement("div");
                containerElement.setAttribute("class", "participant-fields-container");

                

                if(company != null && columns[i] == "company" && company != value){
                    add = false;
                }

                if(country!= null && columns[i] == "country" && country != value){
                    add = false;
                }

                if (options[i] == 'f'){
                    containerElement.setAttribute("class", "participant-fields-container participant-fields-container-extend-width-by-25");
                }

                let boxElement = document.createElement("div");
                boxElement.setAttribute("class", "participant-fields-status");

                if(columns[i] == "sponsorship" && value == true ){
                        let tag = document.createElement("i");
                        tag.setAttribute("class","fa fa-check sponsorship-icon");
                        boxElement.appendChild(tag);
                }
                else if(columns[i] == "linkedin"){
                    
                    let tag = document.createElement("i");
                        tag.setAttribute("class","fa fa-linkedin linkedin-icon");
                    let aTag = document.createElement("a");
                    aTag.setAttribute("href",value);
                    aTag.appendChild(tag);
                    aTag.setAttribute("target","_blank");
                        tag.style.fontSize = "20px";
                        boxElement.appendChild(aTag);
                }
                else{
                    
                    let textNode = document.createTextNode(value);
                    if(columns[i] == "days-remaining"){
                        let diff = dateDifference(row["visa-date"]);
                        textNode = document.createTextNode(diff);
                        if(diff <= 30){
                            containerElement.style.backgroundColor = "lightcoral";
                        }
                    }
                    if(columns[i] == "name" && row["layoffs"] == true){
                        containerElement.style.backgroundColor = "lightcoral";

                    }
                    let spanElement = document.createElement("span");
                    

                    spanElement.appendChild(textNode);
                    boxElement.appendChild(spanElement);
                }

                containerElement.appendChild(boxElement);
                participant.appendChild(containerElement);
               
            }//participant for loop
        
        if(add){
            document.getElementById("participant-list").appendChild(participant);
        }
    
    }
}



function callLoadDirectoryAPI(){

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    fetch('https://31xln6gtw5.execute-api.us-east-1.amazonaws.com/directory', requestOptions)
        .then(response => response.json())
        .then(function(data) {
            console.log(data);
            loadDirectory(data["result"]);
            directoryData = data["result"];
    } );

}


callLoadDirectoryAPI()

    login.onclick = function() {
    console.log("clicked login button ...");

    modal.style.display = "flex";
    login_signup_container.style.display = "flex";
    profile_container.style.display = "none";
    filter_container.style.display = "none";
  
    

}

logout.onclick = function() {
    console.log("clicked login button ...");
    localStorage.removeItem("layoffs_life");
    init();
}



function prepopulateProfile(){
    let data = JSON.parse(localStorage.getItem('layoffs_life_profile'));
    if(data != null){
        if(data["name"] != undefined){
            form_name.value = data["name"];
        }
        if(data["company"] != undefined){
            console.log(data["company"]);
            if (data["company-nl"]){
                form_company.value = "Company not listed";
                form_company_name.value = data["company"];
                document.getElementById("dropdown-value0").innerHTML = "Company not listed";
            }
            else{
                console.log("tryign to set form value");
                form_company.value = data["company"];
                document.getElementById("dropdown-value0").innerHTML = data["company"];
            }
        }
   

        
        if(data["role"] != undefined){
            form_role.value  = data["role"];
        }
        if(data["experience"] != undefined){
            form_experience.value = data["experience"];
        }
        if(data["sponsorship"] != undefined){
            form_sponsorship_yes.checked = data["sponsorship"];
            if (form_sponsorship_yes.checked){
                form_sponsorship_no.checked = false;
                document.getElementById("visa-type-container").style.display= "flex";
                document.getElementById("tlv-container").style.display= "flex";
            }

        }

        if(data["country"] != undefined){
            form_country.value = data["country"];
            document.getElementById("dropdown-value1").innerHTML = data["country"];
        }
        if(data["linkedin"]!= undefined){
            form_linkedin.value =  data["linkedin"];
        }
        if(data["form-visa-type"] != undefined){
            form_visa_type.value = data["form-visa-type"];
        }
        if(data["visa-date"] != undefined){
            form_date.value = data["visa-date"];
        }

        if(data["email-consent"] != undefined){
            form_email_yes.checked = data["email-consent"];
            if (! form_email_yes.checked){
                form_email_no.checked = true;
            }
        }

        if(data["layoff"] != undefined){
            form_layoff_yes.checked = data["email-consent"];
            if (! form_layoff_yes.checked){
                form_layoff_no.checked = true;
            }
        }

    }
}

profile.onclick = function(){


  console.log("clicked profile ......");
  
  let data = JSON.parse(localStorage.getItem('layoffs_life'));
  modal.style.display = "flex";
  login_signup_container.style.display = "none";
  filter_container.style.display = "none";

  if(data == null || (!("email"  in data) && !("password" in data)) ){
    alert_container.style.display = "flex";
    alert_box.style.color = lightcoral;
    alert_box.innerHTML = "Please login before you can add yourself to the directory";
    alert_close.style.color = lightcoral;
  }
  else{
    prepopulateProfile();
    profile_container.style.display = "flex";
  }

}


function callAddMeAPI(data, element){

    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    fetch('https://hmbxl63ne3.execute-api.us-east-1.amazonaws.com/addme', requestOptions)
        .then(response => response.json())
        .then(function(data) {
            alert_container.style.display = "flex";
            if(data["statusCode"] == 200){
                alert_box.style.backgroundColor = 'lightgreen';
                alert_close.style.backgroundColor= 'lightgreen';

                if(element == "add-me"){
                    add_me_container.style.display = "none";
                    remove_me_container.style.display = "flex";
                }
                else{
                    add_me_container.style.display = "flex";
                    remove_me_container.style.display = "none";
                }
                callLoadDirectoryAPI();
            }
            else{
                alert_box.style.backgroundColor = 'lightcoral';
                alert_close.style.backgroundColor= 'lightcoral';
            }
            alert_box.innerHTML = data["body"];
            console.log(element);
            if(element == "add-me"){
                add_me.style.backgroundColor = 'aliceblue';
                isAddmeInProgress = false;

            }
            else if(element == "remove-me"){
                remove_me.style.backgroundColor = 'aliceblue';
                isRemovemeInProgress = false;
            }
    });
}

var isAddmeInProgress = false;
var isRemovemeInProgress = false;

add_me.onclick = function(){
    console.log("add me clicked");
    let data = JSON.parse(localStorage.getItem('layoffs_life'));
    if(data == null || (!("email"  in data) && !("password" in data)) ){
        alert_container.style.display = "flex";
        alert_box.style.backgroundColor = 'lightcoral';
        alert_close.style.backgroundColor= 'lightcoral';
        alert_box.innerHTML = "Please login before you can add yourself to the directory";
        
    }
    else{
        if (! isAddmeInProgress){
            data["action"] = "add";
            isAddmeInProgress = true;
            add_me.style.backgroundColor = 'lightsteelblue';
            callAddMeAPI(data, "add-me") ;
        }
    }

}


remove_me.onclick = function(){
    console.log("add me clicked");
    let data = JSON.parse(localStorage.getItem('layoffs_life'));
    if(data == null || (!("email"  in data) && !("password" in data)) ){
        alert_container.style.display = "flex";
        alert_box.style.backgroundColor = 'lightcoral';
        alert_close.style.backgroundColor= 'lightcoral';
        alert_box.innerHTML = "Please login before you can remove yourself to the directory";
        
    }
    else{
        if(!isRemovemeInProgress){
            isRemovemeInProgress = false;
            remove_me.style.backgroundColor = 'lightsteelblue';
            data["action"] = "remove";
            callAddMeAPI(data, "remove-me");
        }
    }

}




filter.onclick = function(){
    modal.style.display = "flex";
    profile_container.style.display = "none";
    login_signup_container.style.display = "none";
    filter_container.style.display = "flex";
    prepopulateFilter();
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
console.log(event.target);
  if (event.target == modal) {
    
    modal.style.display = "none";
  }
}


alert_close.onclick = function(){
    alert_container.style.display = "none";
}

