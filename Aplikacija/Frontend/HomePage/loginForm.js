import { ClientPageApi } from "../Api/ClientPageApi.js";
import { HomePageApi } from "../Api/HomePageApi.js";

export class LoginForm {
  constructor() {
    this.kontejner = document.createElement("div");
    this.kontejner.classList.add("loginDiv");
    this.kontejner.classList.add("haveBorder");

    let mainWindow = document.querySelector(".mainWindow");
    mainWindow.appendChild(this.kontejner);
  }

  DrawForm() {
    //adding login header
    this.CreateLoginHeader();
    //adding username and password input forms
    this.CreateLoginForms();
    //adding login button
    this.CreateLoginButton();
    //adding paragraph and link for registration
    this.CreateRegistration();
  }

  CreateLoginHeader() {
    //div
    let loginHDiv = document.createElement("div");
    loginHDiv.classList.add("logingHDiv");

    //paragraph
    let loginHeader = document.createElement("p");
    loginHeader.classList.add("slova-bigger");
    loginHeader.classList.add("loginHeading");
    loginHeader.innerText = "Login";

    //appending
    loginHDiv.appendChild(loginHeader);
    this.kontejner.appendChild(loginHDiv);
  }

  CreateLoginForms() {
    //divs
    let usernameDiv = document.createElement("div");
    usernameDiv.classList.add("inputForms");
    let passwordDiv = document.createElement("div");
    passwordDiv.classList.add("inputForms");

    //form
    let forma = document.createElement("form");
    forma.classList.add("formLogin");

    //inputs and labels
    let usernameInput = document.createElement("input");
    usernameInput.type = "text";
    usernameInput.name = "username";
    usernameInput.autocomplete = "username";
    usernameInput.placeholder = "Username";
    // let usernameLabel = document.createElement("label");
    // usernameLabel.innerHTML = "Username:";

    let passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.name = "password";
    passwordInput.autocomplete = "current-password";
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

  CreateLoginButton() {
    //div
    let loginBtnDiv = document.createElement("div");

    let forma = document.querySelector(".formLogin");
    //button
    let loginBtn = document.createElement("button");
    loginBtn.classList.add("loginBtn");
    loginBtn.classList.add("slova-smaller");
    loginBtn.innerHTML = "Login";

    //hyperlink --ovo prvo treba da se proveri jel su tacni podaci pa tek onda da se zove
    let hyperlink = document.createElement("a");
    loginBtn.appendChild(hyperlink);
    hyperlink.href = "../UserHomePage/userHomePage.html";

    //appending
    loginBtnDiv.appendChild(loginBtn);
    this.kontejner.appendChild(forma);
    this.kontejner.appendChild(loginBtnDiv);

    //adding event listener
    loginBtn.onclick = async function () {
      //login api
      let user = {
        username: document.querySelector('input[name="username"]').value,
        password: document.querySelector('input[name="password"]').value,
      };

      console.log(user);
      let api = new HomePageApi();
      var result = await api.Login(user);
      if (result != null) {
        //ubaci id u cookies
        const d = new Date();
        d.setTime(d.getTime() + 60 * 60 * 1000);
        let expires = "expires=" + d.toUTCString();
        //cookie for userID
        document.cookie = "id" + "=" + result.id + ";" + expires + ";path=/";

        //cookie for gymID
        document.cookie =
          "gymID" + "=" + result.gymid + ";" + expires + ";path=/";

        location = hyperlink.href;
      } else {
        //clear controlls
        let inputEls = document.querySelectorAll("input");
        for (let el of inputEls) {
          el.value = "";
        }
      }
    };

    let passInput = document.querySelector('input[type="password"]');

    passInput.onkeyup = async function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        let btn = document.querySelector(".loginBtn");
        btn.click();
      }
    };
  }

  CreateRegistration() {
    //div
    let regParDiv = document.createElement("div");

    //paragraph
    let registrationParagraph = document.createElement("p");
    registrationParagraph.classList.add("regParag");
    registrationParagraph.classList.add("slova-smaller");

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
