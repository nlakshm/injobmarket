var companies = ['','Company not listed','Apple', 'Microsoft', 'Alphabet (Google)', 'Amazon', 'Berkshire Hathaway', 'Tesla', 'UnitedHealth', ]
var countries =['', 'United States','Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Austria', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Channel Islands', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Costa Rica', "Côte d'Ivoire", 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'DR Congo', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Faeroe Islands', 'Finland', 'France', 'French Guiana', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Holy See', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nepal', 'Netherlands', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia', 'Norway', 'Oman', 'Pakistan', 'Panama', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Réunion', 'Romania', 'Russia', 'Rwanda', 'Saint Helena', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'San Marino', 'Sao Tome & Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'State of Palestine', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'The Bahamas', 'Timor-Leste', 'Togo', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe'];


var filter_company = document.getElementById("filter-company");
var filter_country = document.getElementById("filter-country");
var filter_apply = document.getElementById("filter-apply");

for (var i=0;i<companies.length;i++){
    var option = document.createElement("option");
    var text = document.createTextNode(companies[i]);
    option.appendChild(text);
    filter_company.appendChild(option);
}


for (var i=0;i<countries.length;i++){
    var option = document.createElement("option");
    var text = document.createTextNode(countries[i]);
    option.appendChild(text);
    filter_country.appendChild(option);
}

$(document).on('click', '#dropdown2 .option', function (event) {

    $(this).closest('.list').find('.selected').removeClass('selected');
    $(this).addClass('selected');
    var text = $(this).data('display-text') || $(this).text();
    $(this).closest('.dropdown-select').find('.current').text(text);
    $(this).closest('.dropdown-select').prev('select').val($(this).data('value')).trigger('change');
});

$(document).on('click', '#dropdown3 .option', function (event) {

    $(this).closest('.list').find('.selected').removeClass('selected');
    $(this).addClass('selected');
    var text = $(this).data('display-text') || $(this).text();
    $(this).closest('.dropdown-select').find('.current').text(text);
    $(this).closest('.dropdown-select').prev('select').val($(this).data('value')).trigger('change');
});

function prepopulateFilter(){
    let data = JSON.parse(localStorage.getItem("layoffs_life_filter"));
    
    if (data != null){
        console.log(data);
            filter_company.value = data["company"];
            document.getElementById("dropdown-value2").innerHTML = data["company"];

            filter_country.value = data["country"];
            document.getElementById("dropdown-value3").innerHTML = data["country"];
    }

}


filter_apply.onclick=  function(){
    console.log("apply filter ....");
    let data = {};
    data["country"] = filter_country.value;
    data["company"] = filter_company.value;
    localStorage.setItem("layoffs_life_filter", JSON.stringify(data));
    if(directoryData != null){
        console.log("directory data is not null");
        loadDirectory(directoryData);
    }
    else{
        document.getElementById("myModal").style.display = "none";
        callLoadDirectoryAPI();
    }
}