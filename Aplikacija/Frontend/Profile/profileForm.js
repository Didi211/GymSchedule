import { ClientPageApi } from "../Api/ClientPageApi.js";
import { Helpers } from "../HelperFunctions.js";

export class ProfileForm {
  constructor(user) {
    this.helper = new Helpers();
    this.user = user;
    this.updated = false;
    this.editing = false;
    this.kontejner = document.querySelector(".mainWindow");
    this.kontejner.classList.add("haveBorder");
    this.putanja = "../Resource/";
  }

  async DrawForm() {
    //forming a grid panel
    /* u 1 i 1 idu edit i delete
        u sredini idu podaci o klijentu 
        u main window ubaciti tabelu sa 3 kolone odnos da bude 1 2 1 
        ubaciti dodatni div da se centrira slika i edit photo dugme
        a u tom divu postaviti nekako sliku na sredini i dugme 
        u gornjem desnom uglu 
        mozda div i za to*/

    //drawing a gird
    this.DrawTable();

    //adding icnos for edit and delete
    this.AddIcons();

    //adding profile picture and edit icon for picture
    this.AddProfilePicture();
    
    //adding form from registration
    await this.AddRestOfForm();

    //
    // this.ChangePassword(new Helpers(),document.querySelector(".row3 .col2"),this.user);

    //populating the controls
    this.PopulateControls();
    
    // //restricting changes
    this.EnableEditing(false);
    let editIco = document.querySelector(".row1 .col1").firstChild.firstChild;
    this.ReturnEditIcon(editIco);
  }

  DrawTable() {
    let tabela = document.createElement("table");
    tabela.classList.add("formTable");
    let tableBody = document.createElement("tbody");
    tableBody.classList.add("formTbody");

    this.kontejner.appendChild(tabela);
    tabela.appendChild(tableBody);

    let kolone = ["col1", "col2", "col3"];
    let redovi = ["row1", "row2", "row3"];

    for (let i = 0; i < 3; i++) {
      let red = document.createElement("tr");
      red.classList.add(redovi[i]);
      for (let j = 0; j < 3; j++) {
        //adding cells to the current row
        let cell = document.createElement("td");
        cell.classList.add(redovi[i]);
        cell.classList.add(kolone[j]);
        red.appendChild(cell);
      }
      tableBody.appendChild(red);
    }
    let red = tableBody.querySelector(".row3 .col2");
    let btnDiv = document.createElement("div");
    btnDiv.classList.add("btnDiv");
    red.appendChild(btnDiv);
  }

  AddIcons() {
    //edit and delete icon for acc
    let ikone = ["editIcon", "deleteIcon"];
    let positions = ["col1", "col3"];
    for (let i = 0; i < 2; i++) {
      let icoDiv = document.createElement("div");
      icoDiv.classList.add(`${ikone[i]}Div`);
      let img = document.createElement("img");
      img.src = `${this.putanja}${ikone[i]}.png`;
      img.className = "icon";

      let pozicija = document.querySelector(`.row1 .${positions[i]}`);
      //events 
      
      icoDiv.appendChild(img);
      pozicija.appendChild(icoDiv);
    }
    let editImg = document.querySelector(".row1 .col1").firstChild.firstChild;
    editImg.addEventListener('click', () => {
      this.editing = !this.editing;
      this.EnableEditing(this.editing);
    });
    
    let deleteImg = document.querySelector(".row1 .col3").firstChild.firstChild;
    deleteImg.addEventListener('click', async () => { 
      await this.DeleteUser();
    }); 
  }
  async DeleteUser() {
    let result = confirm("Da li zaista zelite da obriste nalog?");
    if(!result) return;
    let helper = new Helpers();
    let userid = helper.ExtractIDFromCookie("id");
    let api = new ClientPageApi();
    result = await  api.DeleteUser(userid);
    if(result) { 
      let logout = document.querySelector(".logOutBtn");
      logout.click();
    }
  }
  EnableEditing(enable) {
    // let editImg = document.querySelector(".editPicIcon");
    let editIco = document.querySelector(".row1 .col1").firstChild.firstChild;
    let saveBtn = document.querySelector(".regLogBtn");
    let chgPassBtn = document.querySelector(".chgPassBtn");
    let savePassBtn = document.querySelector(".saveNewPassBtn");
    let polLabelValue = document.querySelectorAll(".polLabelValue");
    let userNameValue = document.querySelector(".usernameValue");
    if(enable) { 
      // editImg.style.display = "inline-block";
      editIco.src = `${this.putanja}cancelIcon.png`;
      saveBtn.style.display = "inline-block";
      chgPassBtn.style.display = "inline-block";
      for(let pol of polLabelValue) { 
        pol.classList.remove("readOnly");
      }
      userNameValue.classList.remove("readOnly");
      this.ChangeToReadOnly(false);
    }
     else { 
      // editImg.style.display = "none";
      editIco.src = `${this.putanja}editIcon.png`;
      saveBtn.style.display = "none";
      chgPassBtn.style.display = "none";
      savePassBtn.style.display = "none";
      for(let pol of polLabelValue) { 
        pol.classList.add("readOnly");
      }
      userNameValue.classList.add("readOnly");

      let passDivs = document.getElementsByClassName("passDiv");
      for(let div of passDivs) { 
        div.style.display = "none";
        div.querySelector("input").value = "";
      }
      this.ChangeToReadOnly(true);
    }
    return editIco;
  }

  AddProfilePicture() {
    let pozicija = document.querySelector(".row1 .col2");
    let div = document.createElement("div");
    div.className = "profileDiv";

    pozicija.appendChild(div);

    let profilePicture = document.createElement("img");
    profilePicture.className = "profilePicture";
    
    profilePicture.src = `${this.putanja}profile.jpg`;
    div.appendChild(profilePicture);
  }

  CreateParentDiv(parent, childClassName) {
    let child = document.createElement("div");
    child.classList.add(childClassName);
    parent.appendChild(child);
    return child;
  }

  async AddRestOfForm() {
    let pozicija = document.querySelector(".row2 .col2");

    this.helper.CreateInput("Ime", "text", this.CreateParentDiv(pozicija, "infoDiv"));

    this.helper.CreateInput("Prezime", "text", this.CreateParentDiv(pozicija, "infoDiv"));

    this.helper.CreateRadioButton(this.CreateParentDiv(pozicija, "infoDiv"));

    //for gym picker i need label
    let label = document.createElement("label");
    label.classList.add("slova-smaller");
    label.innerHTML = "Teretana:";

    let gymPickerDiv = this.CreateParentDiv(pozicija, "infoDiv");
    gymPickerDiv.appendChild(label);

    function Nothing() { }
    await this.helper.CreateGymPicker(gymPickerDiv,Nothing);

    this.helper.CreateInput("Broj kartice","number",this.CreateParentDiv(pozicija, "infoDiv"));
    
    this.helper.CreateLabel("Username: ","userNameLbl", this.CreateParentDiv(pozicija, "infoDiv"));
    
    //button goes in 3rd row
    pozicija = document.querySelector(".row3 .col2");

    //btn event 
    
    let btn = this.helper.CreateButton("Sacuvaj", pozicija.firstChild, async () => {
      let result = await this.EditProfile(this);
      if(result) { 
        this.updated = true;
      } else { 
        this.updated = false;
      }
      
    });
    btn.style.display = "none";
    //dugme za izmenu sifre 
    let btnChgPass = this.helper.CreateButton("Izmeni sifru",pozicija.firstChild, async() => {
      btnChgPass.style.display = "none";
      // let btnChnPass = this.helper.CreateButton("Sacuvaj novu sifru",mesto,this.ChangePassword);
      // btnChnPass.style.display = "none";
      let btnSavePass = document.querySelector(".saveNewPassBtn");
      btnSavePass.style.display = "inline-block";
      let passDivs = document.getElementsByClassName("passDiv");
      for(let div of passDivs) { div.style.display = "flex";}
    });
    btnChgPass.classList.remove("regLogBtn");
    btnChgPass.classList.add("chgPassBtn");

    //creating controls for passwords 
    this.AddPasswordInputs();
    //adding button for saving new password
    this.AddSavePassButton();
  }

  AddSavePassButton() {
    let mesto = document.querySelector(".row3 .col2");
    let btnSavePass = this.helper.CreateButton("Sacuvaj novu sifru",mesto.firstChild,this.ChangePassword)
    btnSavePass.classList.remove("regLogBtn");
    btnSavePass.classList.add("saveNewPassBtn");

  }
  AddPasswordInputs() {
    let mesto = document.querySelector(".row2 .col2");
      let inputPass1 = this.helper.CreateInput("Stara sifra","password",this.CreateParentDiv(mesto,"passDiv"));
      inputPass1.classList.remove("regEditInputs");
      inputPass1.classList.add("passInput");
      let inputPass2 = this.helper.CreateInput("Nova sifra","password",this.CreateParentDiv(mesto,"passDiv"));
      inputPass2.classList.remove("regEditInputs");
      inputPass2.classList.add("passInput");
      let inputPass3 = this.helper.CreateInput("Potvrdi sifru","password",this.CreateParentDiv(mesto,"passDiv"));
      inputPass3.classList.remove("regEditInputs");
      inputPass3.classList.add("passInput");
      let passDivs = document.getElementsByClassName("passDiv");
      for(let div of passDivs) { div.style.display = "none";}
  }
  async ChangePassword() {
    let api = new ClientPageApi();
    let helper = new Helpers();

    let user = await api.GetUser(helper.ExtractIDFromCookie("id"));   
    let sifre = document.querySelectorAll(".passInput");
    let staraSifraInput = sifre[0].value;
    let novaSifraInput = sifre[1].value;
    let novaSifraConfirm = sifre[2].value;
    if(!helper.ValidateString(staraSifraInput)) {
      alert(`Stara sifra failed in validation.`);
      return;
    } 
    if(!helper.ValidateString(novaSifraInput)) {
      alert(`Nova sifra failed in validation`);
      return;
    }
    if(!helper.ValidateString(novaSifraConfirm)) {
      alert(`Potvrda nove sifre failed in validation`);
      return;
    }
    if(staraSifraInput != user.password) {
      alert(`Uneta stara sifra se ne poklapa sa sifrom iz baze.`);
      return;
    }
    if(novaSifraInput != novaSifraConfirm) {
      alert(`Sifre se ne poklapaju`);
      return;
    }
    let sifreObj =  {
      staraSifra: staraSifraInput,
      novaSifra: novaSifraConfirm
    };
    console.log(sifreObj);
    let result = await api.ChangePassword(user.id, sifreObj);
    if(!result) { 
      return;
    }  
    alert(`Uspesno promenjena sifra.`);
    let passInputs = document.getElementsByClassName("passInput");
    for(let el of passInputs) { el.readOnly = true;}
  }
  async EditProfile(thisob) { 
    let thisObj = thisob;
    let user = PreuzmiIzKontrola();
    if(!user.Validate(false)) {
      alert("Nisu svi podaci korektno validirani");
      return false;
    }
    let api = new ClientPageApi();
    let result = await api.EditProfile(user);
    if(result) { 
      alert("Uspesno izmenjen profil.");
      thisObj.EnableEditing(false);
      return true;
    }
    

    function PreuzmiIzKontrola() { 
      let helper = new Helpers();
  
      let usr = helper.UserFromControls(false);
      usr.id = helper.ExtractIDFromCookie("id");
      let gymCookie = helper.ExtractIDFromCookie("gymID");
      if(gymCookie != usr.gymID) { 
        //promena cookie-ja ako je promenio teretanu 
        const d = new Date();
        d.setTime(d.getTime() + 60 * 60 * 1000);
        let expires = "expires=" + d.toUTCString();
        document.cookie ="gymID" + "=" + usr.gymID + ";" + expires + ";path=/";
      }
       
      // let formData = new FormData();
      // formData.append('profilePicture',this.user.imageFile);
      // this.user.imageFile = formData;
      return usr;
    }
  }

  PopulateControls() {
    let profilePic = document.querySelector(".profilePicture");
    // if(this.user.imageName != null) { 
    //   profilePic.src = this.user.imageSrc;
    //   profilePic.alt = this.user.imageName;

    // }
    let elements = document.getElementsByClassName("regEditInputs");
    console.log(elements);
   
    elements[0].value = this.user.ime;
    elements[1].value = this.user.prezime;
    if(this.user.pol == "M") { 
      elements[2].checked = true;
    } else {
      elements[3].checked = true;
    }
    elements[4].value = this.user.gymID;
    elements[5].value = this.user.brojKartice;
    let lblParent = document.querySelector(".userNameLbl").parentElement;
    let helper = new Helpers();
    helper.CreateLabel(this.user.username,"usernameValue",lblParent);

    
  }
 
  ChangeToReadOnly(readonly) {
    let elements = document.querySelectorAll(".regEditInputs");
    elements[0].readOnly = readonly
    elements[1].readOnly = readonly;
    elements[2].disabled = readonly;
    elements[3].disabled = readonly;
    elements[4].disabled = readonly;
    elements[5].readOnly = readonly;
  }
  ReturnEditIcon(editEl) {
    editEl.src = `${this.putanja}editIcon.png`;
  }
}
