export class LoginForm
{
    constructor()
    {
        this.kontejner = document.createElement("div");
        this.kontejner.classList.add("loginDiv");

        let mainWindow = document.querySelector(".mainWindow");
        mainWindow.appendChild(this.kontejner);
    }

    DrawForm()
    {
        //adding login header
        this.CreateLoginHeader();
        //adding username and password input forms
        this.CreateLoginForms();
        //adding login button 
        this.CreateLoginButton();
        //adding paragraph and link for registration
        this.CreateRegistration();
         
    }

    CreateLoginHeader()
    {
        //div
        let loginHDiv = document.createElement("div");
        loginHDiv.classList.add("logingHDiv");
        
        //paragraph
        let loginHeader = document.createElement("p");
        loginHeader.classList.add("slova");
        loginHeader.classList.add("loginHeading");
        loginHeader.innerText = "Login";

        //appending
        loginHDiv.appendChild(loginHeader);
        this.kontejner.appendChild(loginHDiv);
    }

    CreateLoginForms()
    {
        //divs
        let usernameDiv = document.createElement("div");
        usernameDiv.classList.add("inputForms");
        let passwordDiv = document.createElement("div")
        passwordDiv.classList.add("inputForms");

        //form
        let forma = document.createElement("form");
        forma.classList.add("formLogin")
        
        //inputs and labels
        let usernameInput = document.createElement("input");
        usernameInput.type = "text";
        usernameInput.name = "username";
        usernameInput.placeholder = "Username";
        // let usernameLabel = document.createElement("label");
        // usernameLabel.innerHTML = "Username:";

        let passwordInput = document.createElement("input");
        passwordInput.type = "password";
        passwordInput.name = "password";
        passwordInput.placeholder = "Password";
        // let passwordLabel = document.createElement("label");
        // passwordLabel.innerHTML = "Password:"
        
        //appending
        
        // usernameDiv.appendChild(usernameLabel);
        usernameDiv.appendChild(usernameInput);
        
        // passwordDiv.appendChild(passwordLabel);
        passwordDiv.appendChild(passwordInput);

        forma.appendChild(usernameDiv);
        forma.appendChild(passwordDiv);
        this.kontejner.appendChild(forma);




    }

    CreateLoginButton()
    {
        //div
        let loginBtnDiv = document.createElement("div");
        
        let forma = document.querySelector(".formLogin");
        //button
        let loginBtn = document.createElement("button");
        loginBtn.classList.add("loginBtn");
        loginBtn.innerHTML = "Login";

        //hyperlink --ovo prvo treba da se proveri jel su tacni podaci pa tek onda da se zove
        let hyperlink = document.createElement("a");
        loginBtn.appendChild(hyperlink);
        hyperlink.href = "../UserHomePage/userHomePage.html";
        loginBtn.onclick = function()
        {
            console.log("entered onClick fun");
            location = hyperlink.href;
            
        };

        
        //appending
        loginBtnDiv.appendChild(loginBtn);
        forma.appendChild(loginBtnDiv);
        this.kontejner.appendChild(loginBtnDiv);

    }

    CreateRegistration()
    {
        //div
        let regParDiv =  document.createElement("div");
        
        //paragraph
        let registrationParagraph = document.createElement("p");
        registrationParagraph.classList.add("regParag");
        registrationParagraph.innerHTML = "Nemate nalog?\nNapravite ga ";

        //link to reg page
        let recOvde = document.createElement("a");
        recOvde.innerHTML = "ovde.";
        recOvde.href = "../Register/registerPage.html";
        recOvde.classList.add("regLink");

        //appending
        registrationParagraph.appendChild(recOvde);
        regParDiv.appendChild(registrationParagraph);
        this.kontejner.appendChild(regParDiv);

    }
}