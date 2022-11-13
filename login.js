var isSignUpInProgress = false;
var isLoginInProgress = false;

    function isValidEmail(email) 
        {   
            
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
            {
                console.log("email is valid ..");
                return true;
            }
            
            return false;
        }
    
    function showMessage(id, message, color){
        let messageBox = document.getElementById(id);
        messageBox.innerHTML = message;
        messageBox.style.backgroundColor = color;
        messageBox.style.display = "flex";
    }

    function callSignUpAPI(){
        let emailId = document.getElementById("signup-email").value;
        console.log(emailId);
        if(isValidEmail(emailId)){
            console.log("email is valid. ...");
            
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: emailId })
            };

            fetch('https://oxrsmt7sfk.execute-api.us-east-1.amazonaws.com/signup/', requestOptions)
                .then(response => response.json())
                .then(function(data) {
                    if(data["statusCode"] == 200){
                        navToPage('login');
                        console.log("navigating to page login .....", data);
                        showMessage("login-message-box", data["body"], "lightgreen" )
                    }
                    else{
                        showMessage("signup-message-box", data["body"], "lightcoral" )
                    }

                    isSignUpInProgress = false;
                    document.getElementById("signup-button").style.backgroundColor = 'white';

                } );
        }
        else{
            showMessage("signup-message-box", "Please enter a valid email address", "lightcoral" )
            isSignUpInProgress = false;
            document.getElementById("signup-button").style.backgroundColor = 'white';
        }
    }

    function postLogin(email, password){
                        
                        data = {}
                        data["email"] = email;
                        data["password"] = password;
                        localStorage.setItem('layoffs_life',JSON.stringify(data));

                        document.getElementById("myModal").style.display= "none";

                        init();
    }

    function callLoginAPI(){
        console.log("inside login ..");
        let email = document.getElementById("login-email").value;
        let password = document.getElementById("login-password").value;

        const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, password:password })
            };

        fetch('https://19roau9a3f.execute-api.us-east-1.amazonaws.com/login', requestOptions)
                .then(response => response.json())
                .then(function(data) {
                    if(data["statusCode"] == 200){
                        showMessage("login-message-box", data["body"], "lightgreen" )
                        postLogin(email, password);
                    }
                    else{
                        showMessage("login-message-box", data["body"], "lightcoral" )
                    }
                } );
        isLoginInProgress = false;
        document.getElementById("login-button").style.backgroundColor = 'white';



    }


    function signUp(){
         console.log("signup button called ...");
            if(! isSignUpInProgress){
                isSignUpInProgress = true;
                document.getElementById("signup-button").style.backgroundColor = '#dcdcdc';
                callSignUpAPI();
            }
    }

    function login(){
        if(!isLoginInProgress){
            isLoginInProgress = true;
            document.getElementById("signup-button").style.backgroundColor = '#dcdcdc';
            callLoginAPI();
        }

    }

    function navToPage(page){
        console.log(page);
        if (page == 'login'){
            document.getElementById("login-container").style.display = "flex";
            document.getElementById("signup-container").style.display = "none";
        }

        if(page == 'signup'){
            document.getElementById("login-container").style.display = "none";
            document.getElementById("signup-container").style.display = "flex";
        }

    }