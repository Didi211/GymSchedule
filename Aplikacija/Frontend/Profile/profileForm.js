import { ClientPageApi } from "../Api/ClientPageApi.js";
import { Helpers } from "../HelperFunctions.js";

export class ProfileForm {
  constructor(user) {
    this.helper = new Helpers();
    this.user = user;
    this.updated = false;
    this.editing = false;
    this.kontejner = document.querySelector(".mainWindow");
    this.putanja = "../../Resource/";
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
    
    //populating the controls
    this.PopulateControls();
    
    // //restricting changes
    this.EnableEditing(false);
    let editIco = document.querySelector(".row1 .col1").firstChild;
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
  }

  AddIcons() {
    //edit and delete icon for acc
    let ikone = ["editIcon", "deleteIcon"];
    let positions = ["col1", "col3"];
    for (let i = 0; i < 2; i++) {
      let img = document.createElement("img");
      img.src = `${this.putanja}${ikone[i]}.png`;
      img.className = "icon";

      let pozicija = document.querySelector(`.row1 .${positions[i]}`);
      //events 
      
      pozicija.appendChild(img);
    }
    let editImg = document.querySelector(".row1 .col1").firstChild;
    editImg.addEventListener('click', () => {
      this.editing = !this.editing;
      this.EnableEditing(this.editing);
    });
    
    let deleteImg = document.querySelector(".row1 .col3").firstChild;
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
    let editIco = document.querySelector(".row1 .col1").firstChild;
    let saveBtn = document.querySelector(".regLogBtn");
    if(enable) { 
      // editImg.style.display = "inline-block";
      editIco.src = `${this.putanja}cancelIcon.png`;
      saveBtn.style.display = "inline-block";

      this.ChangeToReadOnly(false);

    } else { 
      // editImg.style.display = "none";
      editIco.src = `${this.putanja}editIcon.png`;
      saveBtn.style.display = "none";
      

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
    //ovde treba da se zove api koji povlaci sliku iz baze
    //ili se u objektu korisnik zapamti putanja pored ostalih
    //podataka (usteda na pozivima)
    //i ovde samo iskoristi taj link
    
    profilePicture.src = `${this.putanja}profile.jpg`;

    // let imageInput = document.createElement("input");
    // imageInput.type = "file";
    // imageInput.classList.add("insertPic");
    // imageInput.accept = "image/png, image/jpeg";
    // imageInput.multiple = false;
    // imageInput.style.display = "none";
    
    
    // let editIcon = document.createElement("img");
    // editIcon.src = `${this.putanja}editIcon.png`;
    // editIcon.className = "editPicIcon";
    
    
    //event listeners
    // editIcon.addEventListener('click', async () =>   {
    //   let imgFileBtn = document.querySelector(".insertPic");
    //   imgFileBtn.click();
      
    // });

    // imageInput.addEventListener('change' , (event) => {
    //   const fileList = event.target.files;
    //   let thisObj = this;
    //   if(fileList.length > 0) {
    //     console.log( fileList[0]);
    //     let profilnaSlika = document.querySelector(".profilePicture");
    //     var reader = new FileReader();
    //     reader.onloadend = function () { 
    //       profilnaSlika.src = reader.result;
    //       profilnaSlika.alt = fileList[0].name;
    //       console.log(thisObj);
    //       thisObj.user.imageFile = fileList[0];
    //     }
    //     reader.readAsDataURL(fileList[0]);
    //   }
    // });

    //fileButton 
    // div.appendChild(imageInput);
    div.appendChild(profilePicture);
    // div.appendChild(editIcon);
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
    label.classList.add("slova");
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
    
    let btn = this.helper.CreateButton("Sacuvaj izmene", pozicija, async () => {
      let result = await this.EditProfile(this);
      if(result) { 
        this.updated = true;
      } else { 
        this.updated = false;
      }
      
    });
    btn.style.display = "none";

    
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
        d.setTime(d.getTime() + 5 * 24 * 60 * 60 * 1000);
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
