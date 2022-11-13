var inc = 0;
function create_custom_dropdowns() {
    $('select').each(function (i, select) {
        if (!$(this).next().hasClass('dropdown-select')) {
            $(this).after('<div class="dropdown-select wide ' + ($(this).attr('class') || '') + '" tabindex="0" ><span id="dropdown-value'+i.toString()+'" class="current"></span><div class="list"><ul id="dropdown'+i.toString()+'"></ul></div></div>');
            var dropdown = $(this).next();
            var options = $(select).find('option');
            var selected = $(this).find('option:selected');
            dropdown.find('.current').html(selected.data('display-text') || selected.text());
            options.each(function (j, o) {
                var display = $(o).data('display-text') || '';
                dropdown.find('ul').append('<li class="option ' + ($(o).is(':selected') ? 'selected' : '') + '" data-value="' + $(o).val() + '" data-display-text="' + display + '">' + $(o).text() + '</li>');
            });
            let id = "'txtSearchValue"+ inc.toString()+"'";
    
    $('#'+'dropdown'+inc.toString()).before('<div class="dd-search"><input id='+ id+' autocomplete="off" onkeyup="filter('+id+')" class="dd-searchbox" type="text"></div>');
    inc += 1; 
        }
    });
    console.log(inc);
      
}


$(document).on('click', '.dropdown-select', function (event) {
    if($(event.target).hasClass('dd-searchbox')){
        return;
    }
    $('.dropdown-select').not($(this)).removeClass('open');
    $(this).toggleClass('open');
    if ($(this).hasClass('open')) {
        $(this).find('.option').attr('tabindex', 0);
        $(this).find('.selected').focus();
    } else {
        $(this).find('.option').removeAttr('tabindex');
        $(this).focus();
    }
});

// Close when clicking outside
$(document).on('click', function (event) {
    if ($(event.target).closest('.dropdown-select').length === 0) {
        $('.dropdown-select').removeClass('open');
        $('.dropdown-select .option').removeAttr('tabindex');
    }
    event.stopPropagation();
});

function filter(id){
    console.log(id);
    var valThis = $('#'+id).val();
    console.log(valThis);
    $('.dropdown-select ul > li').each(function(){
     var text = $(this).text();
        (text.toLowerCase().indexOf(valThis.toLowerCase()) > -1) ? $(this).show() : $(this).hide();         
   });
};

$(document).on('click', '#dropdown0 .option', function (event) {

    $(this).closest('.list').find('.selected').removeClass('selected');
    $(this).addClass('selected');
    var text = $(this).data('display-text') || $(this).text();
    document.getElementById("form-company-name-container").style.display = "none";
    if(text == "Company not listed"){
        document.getElementById("form-company-name-container").style.display = "flex";
    }
    $(this).closest('.dropdown-select').find('.current').text(text);
    $(this).closest('.dropdown-select').prev('select').val($(this).data('value')).trigger('change');
});

$(document).on('click', '#dropdown1 .option', function (event) {

    $(this).closest('.list').find('.selected').removeClass('selected');
    $(this).addClass('selected');
    var text = $(this).data('display-text') || $(this).text();
    $(this).closest('.dropdown-select').find('.current').text(text);
    $(this).closest('.dropdown-select').prev('select').val($(this).data('value')).trigger('change');
});


$(document).on('keydown', '.dropdown-select', function (event) {
    var focused_option = $($(this).find('.list .option:focus')[0] || $(this).find('.list .option.selected')[0]);
    if (event.keyCode == 13) {
        if ($(this).hasClass('open')) {
            focused_option.trigger('click');
        } else {
            $(this).trigger('click');
        }
        return false;
    } else if (event.keyCode == 40) {
        if (!$(this).hasClass('open')) {
            $(this).trigger('click');
        } else {
            focused_option.next().focus();
        }
        return false;
    } else if (event.keyCode == 38) {
        if (!$(this).hasClass('open')) {
            $(this).trigger('click');
        } else {
            var focused_option = $($(this).find('.list .option:focus')[0] || $(this).find('.list .option.selected')[0]);
            focused_option.prev().focus();
        }
        return false;
    } else if (event.keyCode == 27) {
        if ($(this).hasClass('open')) {
            $(this).trigger('click');
        }
        return false;
    }
});

var companies = ['','Company not listed','Apple', 'Microsoft', 'Alphabet (Google)', 'Amazon', 'Berkshire Hathaway', 'Tesla', 'UnitedHealth', ]
var countries =['', 'United States','Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Austria', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Channel Islands', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', "Côte d'Ivoire", 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'DR Congo', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Faeroe Islands', 'Finland', 'France', 'French Guiana', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Holy See', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nepal', 'Netherlands', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Panama', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Réunion', 'Romania', 'Russia', 'Rwanda', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'San Marino', 'Sao Tome & Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'State of Palestine', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'The Bahamas', 'Timor-Leste', 'Togo', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'];


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

var form_message_box = document.getElementById("form-message-box");
var form_layoff = document.getElementById("layoff-yes");

for (var i=0;i<companies.length;i++){
    var option = document.createElement("option");
    var text = document.createTextNode(companies[i]);
    option.appendChild(text);
    form_company.appendChild(option);
}


for (var i=0;i<countries.length;i++){
    var option = document.createElement("option");
    var text = document.createTextNode(countries[i]);
    option.appendChild(text);
    form_country.appendChild(option);
}


function visa_toggle(value){
    let element = document.getElementById(value);
    element.checked =false;
    console.log("inside visa toggle ....");

    if(value == "form-sponsorship-no"){
        document.getElementById("visa-type-container").style.display= "flex";
        document.getElementById("tlv-container").style.display= "flex";
    }
    else{
        document.getElementById("visa-type-container").style.display= "none";
        document.getElementById("tlv-container").style.display= "none";
    }

}

function email_toggle(value){
    console.log("inside email toggle ....");
    let element = document.getElementById(value);
    element.checked =false;
}

function layoff_toggle(value){
    console.log("inside email toggle ....");
    let element = document.getElementById(value);
    element.checked =false;
}

function showMessage(id, message, color){
    let messageBox = document.getElementById(id);
    messageBox.innerHTML = message;
    messageBox.style.backgroundColor = color;
    messageBox.style.display = "flex";
}




function isValidForm(){
    let name = form_name.value;

    if (name.length == 0){
        showMessage("form-message-box", "Please enter your name", "lighcoral")
        return false;
       
    }

    let company = form_company.value;
    if(company.length == 0){
        showMessage("form-message-box", "Please select your company", "lighcoral")
        return false;
    }
    else{
        if(company == "Company not listed"){
            let company_name_text = form_company_name.value;
            if(company_name_text.length == 0){
                showMessage("form-message-box", "Please enter your company name", "lighcoral")
                return false;
            }
        }
    }

    let role = form_role.value;
    if (role.length == 0){
        showMessage("form-message-box", "Please enter your current role", "lighcoral")
        return false ;
     
    }

    let experience = form_experience.value;
    if (experience.length == 0){
        showMessage("form-message-box", "Please enter your experience in years", "lighcoral")
        return false;
    }
    let country = form_country.value;
    if (country.length == 0){
        showMessage("form-message-box", "Please pick a country", "lighcoral")
        return false;
    }
        
    if(! form_sponsorship_yes.checked && !form_sponsorship_no.checked){
            showMessage("form-message-box", "Please select if you need visa sponsorship or not", "lighcoral")
            return false;
    }

    if(form_sponsorship_yes.checked){
        /*
        let visa_type = form_visa_type.value;
        if (visa_type.length == 0){
            showMessage("form-message-box", "Please enter your visa type", "lighcoral")
            return false;
            
        }
        
        let date = form_date.value;
        if (date.length == 0){
            showMessage("form-message-box", "Please pick a valid date", "lighcoral")
            return false;
        }
        */
    }

    if(! form_email_yes.checked && !form_email_no.checked){
        showMessage("form-message-box", "Please select if you need us to display your email or not", "lighcoral")
        return false;
    }

    return true;
    
}


function getFormData(){
    data = {};
    let item = JSON.parse(localStorage.getItem("layoffs_life"));
    console.log(item["email"]);
    data["email"] = item["email"];
    data["password"] = item["password"];
    data["name"] = form_name.value;
    data["company"] = form_company.value;
    data["company-nl"] = false;
    if (data["company"] == "Company not listed"){
        data["company"] = form_company_name.value;
        data["company-nl"] =true;
    }
    data["role"] = form_role.value;
    data["experience"] = form_experience.value;
    data["sponsorship"] = form_sponsorship_yes.checked;
    
    data["visa-type"] = "-";
    data["visa-date"] = 0;
    
    if (data["sponsorship"]){
        data["visa-type"] = form_visa_type.value;
        data["visa-date"] = form_date.value;
    } 

    data["country"] = form_country.value;
    data["email-consent"] = form_email_yes.checked;
    data["linkedin"] = form_linkedin.value;
    data["layoff"] = form_layoff.checked;
    return data;

}



function callProfileUpdateAPI(){
    let profileData =  getFormData();
    console.log("form data ...");
    console.log(data);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData )
    };

    fetch('https://26evty2w6d.execute-api.us-east-1.amazonaws.com/profile', requestOptions)
        .then(response => response.json())
        .then(function(data) {
            if(data["statusCode"] == 200){
                
                alert_container.style.display = "flex";
                alert_box.style.backgroundColor = 'lightgreen';
                alert_close.style.backgroundColor= 'lightgreen';
                alert_box.innerHTML = data["body"];

                localStorage.setItem("layoffs_life_profile", JSON.stringify(profileData ));
                document.getElementById("myModal").style.display = "none";
                callLoadDirectoryAPI();
            }
            else{
                showMessage("form-message-box", data["body"], "lightcoral" )
            }
            isProfileUpdateInProgress = false;
            document.getElementById("form-update").style.backgroundColor = 'white';
    } );


}

var isProfileUpdateInProgress = false;
function updateProfile(){
        let isProfileValid = isValidForm();
        console.log(isProfileValid);
        if(isProfileValid && !isProfileUpdateInProgress){
            isProfileUpdateInProgress = true;
            document.getElementById("form-update").style.backgroundColor = '#dcdcdc';
            callProfileUpdateAPI();
        }
}


$(document).ready(function () {
    create_custom_dropdowns();
});


