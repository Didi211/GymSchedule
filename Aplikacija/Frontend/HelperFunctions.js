import { HomePageApi } from "./Api/HomePageApi.js";
import { ClientPageApi } from "./Api/ClientPageApi.js";
import { COLORS } from "./boje.js";
import { User } from "./Classes/User.js";

export class Helpers {
  constructor() {
    this.HomePageApi = new HomePageApi();
    // this.ClientPageApi = new ClientPageApi();
  }
  //main window
  CreateMainWindow() {
    let glavniProzor = document.createElement("div");
    glavniProzor.className = "mainWindow";
    document.body.appendChild(glavniProzor);
    return glavniProzor;
  }

  //gymPicker
  async CreateGymPicker(kontejner, evFunc) {
    //creating drop-down list
    let gymList = document.createElement("select");
    gymList.classList.add("gymListSelect");
    gymList.classList.add("slova-smaller");
    gymList.classList.add("regEditInputs");
    gymList.classList.add("regInput");

    //calling api for all gyms
    let gyms = await this.HomePageApi.GetAllGyms();

    //creating default option
    let option = document.createElement("option");
    option.value = "";
    option.innerText = "Izaberi teretanu..";
    gymList.appendChild(option);

    //actual gym options
    for (let i = 0; i < gyms.length; i++) {
      let option = document.createElement("option");
      option.value = gyms[i].gymID;
      option.innerText = gyms[i].naziv;
      gymList.appendChild(option);
    }
    gymList.addEventListener("change", async () => {
      await evFunc();
    });
    kontejner.appendChild(gymList);
  }
  //input
  CreateInput(specificInput, type, kontejner) {
    //div
    // let div = document.createElement("div");
    // div.classList.add("regDiv");

    //label
    let label = document.createElement("label");
    label.classList.add("slova-smaller");
    label.innerHTML = specificInput + ":";

    //input
    let input = document.createElement("input");
    input.type = type;
    input.min = 1;
    input.classList.add("slova-smaller");
    input.classList.add("regEditInputs");
    input.classList.add("regInput");


    //appending

    kontejner.appendChild(label);
    kontejner.appendChild(input);
  }
  CreateLabel(value, className, kontejner) { 
    let label = document.createElement("label");
    label.classList.add("slova-smaller");
    label.classList.add(className);

    label.innerHTML = value;
    kontejner.appendChild(label);
  }
  CreateRadioButton(kontejner) {
    // let radioDiv = document.createElement("div");
    // radioDiv.classList.add("radioDiv");

    let label = document.createElement("label");
    label.innerHTML = "Pol:";
    label.classList.add("polLabel");
    label.classList.add("slova-smaller")
    kontejner.appendChild(label);
    // kontejner.appendChild(radioDiv);
    // //label, M F POL
    let labelNames = ["M", "F"];
    for (let i = 0; i < 2; i++) {
      let div = document.createElement("div");
      div.classList.add("oneRadioBtn");
      //radioDiv
      kontejner.appendChild(div);
      label = document.createElement("label");
      label.classList.add("slova-smaller");
      label.classList.add("polLabelValue")
      label.innerHTML = labelNames[i];

      div.appendChild(label);
      //radio buttons
      let rbtn = document.createElement("input");
      rbtn.type = "radio";
      rbtn.name = "polRadio";
      rbtn.classList.add("polRadioBtn");
      rbtn.classList.add("regEditInputs");
      div.appendChild(rbtn);
    }
  }

  CreateButton(innerWord, kontejner, evFunc) {
    // //button
    let btn = document.createElement("button");
    btn.classList.add("regLogBtn");
    btn.classList.add("slova-smaller");
    btn.innerHTML = innerWord;
    kontejner.appendChild(btn);

    //adding event
    btn.addEventListener("click", async () => {
      await evFunc();
    });
    return btn;
  }

  ValidateString(word) {
    if (word === "") return false;
    if (word == undefined) return false;
    if (word == null) return false;

    return true;
  }

  ExtractIDFromCookie(cname) {
    //gymID=1; id=13
    let cookies = document.cookie.split(" ");
    let cookiesNum = cookies.length;
    let ind;
    for (let i = 0; i < cookiesNum; i++) {
      if (cookies[i].search(cname) >= 0) {
        ind = i;
        break;
      }
    }
    let indexCA = cookies[ind].search(`=`);
    let value;
    if (cookies[ind].search(";") >= 0) {
      value = cookies[ind].slice(indexCA + 1, cookies[ind].length - 1);
    } else {
      value = cookies[ind].slice(indexCA + 1, cookies[ind].length);
    }
    return value;
  }

  DateInString(datum) {
    let dan = datum.getDate();
    if (dan < 10) {
      dan = "0" + dan;
    }
    let mesec = datum.getMonth() + 1;
    if (mesec < 10) {
      mesec = "0" + mesec;
    }
    return `${datum.getFullYear()}-${mesec}-${dan}`;
  }

  ShowHideButton(btn,show) {
    if(show) {
      btn.style.display = "block";
    }
    else { 
      btn.style.display = "none";
    }
  }

  UserFromControls(register) { 
    let inputs = document.querySelectorAll(".regEditInputs");
    let ime, prezime, pol, teretana, username, password, brKartice;

    ime = inputs[0].value;
    prezime = inputs[1].value;
    if(inputs[2].checked) { 
      pol = "M";
    } else { 
      pol = "F";
    }
    teretana = inputs[4].value;
    brKartice = inputs[5].value;
    if(register) {  
      //calling function from register page
      username = inputs[6].value;
      passowrd = inputs[7].value;
    } 

    return new User(0,ime,prezime,pol,teretana,username,password,brKartice);
  }


}
