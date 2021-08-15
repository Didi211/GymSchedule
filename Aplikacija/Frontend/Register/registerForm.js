import { Helpers } from "../HelperFunctions.js";
import { GymForm } from "../HomePage/gymPicForm.js";
import { User } from "../Classes/User.js";
import { HomePageApi } from "../Api/HomePageApi.js";
export class RegisterForm {
  constructor() {
    this.kontejner = document.createElement("div");
    this.kontejner.classList.add("container");
    let mainWindow = document.querySelector(".mainWindow");
    mainWindow.classList.add("haveBorder");
    mainWindow.appendChild(this.kontejner);
    this.helper = new Helpers();
  }

  DrawForm() {
    //adding name input
    this.CreateInput("Ime", "text");
    //adding surname input
    this.CreateInput("Prezime", "text");
    //adding sex radio button input
    this.CreateRadioButton();
    //adding gym picker
    this.CreateGymPicker();
    //adding cardNo input
    this.CreateInput("Broj kartice", "number");
    //adding username input
    this.CreateInput("Username", "text");
    //adding password input
    this.CreateInput("Password", "password");
    //adding Register button
    this.CreateRegisterButton();
  }

  CreateInput(specificInput, type) {
    //div
    let div = document.createElement("div");
    div.classList.add("regDiv");

    this.kontejner.appendChild(div);
    this.helper.CreateInput(specificInput, type, div);
  }

  CreateGymPicker() {
    //div
    let div = document.createElement("div");
    div.classList.add("regDiv");

    //label
    let label = document.createElement("label");
    label.classList.add("slova-smaller");
    label.innerHTML = "Teretana:";
    div.appendChild(label);

    //gymPicker from GymForm
    function Nothing() {}
    this.helper.CreateGymPicker(div, Nothing);

    //appending
    this.kontejner.appendChild(div);
  }

  CreateRadioButton() {
    //div
    let div = document.createElement("div");
    div.classList.add("regDiv");

    this.helper.CreateRadioButton(div);

    this.kontejner.appendChild(div);
  }

  CreateRegisterButton() {
    //div
    let div = document.createElement("div");
    div.classList.add("regBtnDiv");

    this.helper.CreateButton("Register", div, this.RegisterFunc);

    //appending
    // div.appendChild(regBtn);
    this.kontejner.appendChild(div);
  }

  async RegisterFunc() {
    //collecting data from controlls
    let helper = new Helpers();
    let usr = helper.UserFromControls(true);
    if (!usr.Validate(true)) {
      alert("Validation failed.");
      location.reload();
      return false;
    } else {
      //calling api
      let api = new HomePageApi();
      usr = await api.Register(usr);

      //ubaci id u cookies
      const d = new Date();
      d.setTime(d.getTime() + 60 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();
      //cookie for userID
      document.cookie = "id" + "=" + usr.id + ";" + expires + ";path=/";

      //cookie for gymID
      document.cookie = "gymID" + "=" + usr.gymid + ";" + expires + ";path=/";

      location = "../UserHomePage/userHomePage.html";
    }

    //
  }
}
