import { Helpers } from "../HelperFunctions.js";
import { HomePageApi } from "../Api/HomePageApi.js";
import { COLORS } from "../boje.js";
export class GymForm {
  constructor() {
    this.kontejner = document.createElement("div");
    this.kontejner.classList.add("leftDiv");
    this.kontejner.classList.add("haveBorder");


    let mainWindow = document.querySelector(".mainWindow");
    mainWindow.appendChild(this.kontejner);
  }

  CreateThreeDivs() { //heading, chooseGym and gymPic divs
    let classNames = ["headingDiv", "chooseGymDiv", "gymPicDiv"];

    for (let i = 0; i < 3; i++) {
      let tmpDiv = document.createElement("div");
      tmpDiv.classList.add(classNames[i]);

      this.kontejner.appendChild(tmpDiv);
    }
  }

  CreateHeading() {
    let prvaRecenica = "Proverite i zakazite svoj trening";
    let drugaRecenica = "unapred i trenirajte";
    let trecaRecenica = "bez brige!";

    let headingDiv = document.querySelector(".headingDiv");

    let partOfHeading = document.createElement("p");
    partOfHeading.classList.add("slova-bigger");
    partOfHeading.classList.add("shiftLeft")
    partOfHeading.innerText = prvaRecenica;
    headingDiv.appendChild(partOfHeading);

    partOfHeading = document.createElement("p");
    partOfHeading.classList.add("slova-bigger");
    partOfHeading.classList.add("shiftLeft")
    partOfHeading.innerText = drugaRecenica;
    headingDiv.appendChild(partOfHeading);

    partOfHeading = document.createElement("p");
    partOfHeading.classList.add("slova-bigger");
    partOfHeading.classList.add("shiftLeft")
    partOfHeading.innerText = trecaRecenica;
    headingDiv.appendChild(partOfHeading);

    this.CreateHr(headingDiv);
  }

  CreateGymText(kontejner) {
    //first creating text
    let paragraph = document.createElement("p");
    paragraph.classList.add("gymParagraph");
    paragraph.classList.add("slova-smaller");
    paragraph.classList.add("shiftLeft");
    paragraph.textContent = "Teretane u kojima mozete da trenirate: ";

    let chooseGymDiv = document.querySelector(".chooseGymDiv");
    kontejner.appendChild(paragraph);
  }

  CreateGymPicker(kontejner) {
    let help = new Helpers();
    help.CreateGymPicker(kontejner, this.ChangeGymForm);
    // Helpers.CreateGymPicker(kontejner,ChangeGymForm);
  }

  async ChangeGymForm() {
    let choosenGym = document.querySelector(".gymListSelect");
    //ako nista nisam selektovao po default-u je prvi el a on ima indeks 0
    let index = choosenGym.selectedIndex;
    if (index !== 0) {
      let id = parseInt(choosenGym.options[choosenGym.selectedIndex].value);
      //api call for choosen gym
      let api = new HomePageApi();
      let gym = await api.GetGym(id);
      //adding radno vreme
      let radnoVreme = document.querySelector(".workingHourPar");
      radnoVreme.style.display = "block";
      radnoVreme.innerText = `Radno vreme: ${gym.radnoVreme}`;

      //adding galeriju
      let galerija = document.querySelector(".gymPic");
      galerija.style.display = "block";
      galerija.src = gym.SlikeDLL.getHead("").value.imageSrc;
      galerija.alt = gym.SlikeDLL.getHead("").value.imageName;
      let btns = document.querySelectorAll(".btnForPic");

      //adding events for buttons
      function getPrevPic() {
        let slikaNode = gym.SlikeDLL.getHead("prev");
        let prevImage = slikaNode.prev.value;
        let imgEl = document.querySelector(".gymPic");
        imgEl.src = prevImage.imageSrc;
        imgEl.alt = prevImage.imageName;
      }
      function getNextPic() {
        let slikaNode = gym.SlikeDLL.getHead("next");
        let nextImage = slikaNode.next.value;
        let imgEl = document.querySelector(".gymPic");
        imgEl.src = nextImage.imageSrc;
        imgEl.alt = nextImage.imageName;
      }

      btns.forEach((button) => {
        if (button.innerText == "<") {
          button.addEventListener("click", getPrevPic);
        } else {
          button.addEventListener("click", getNextPic);
        }
        button.style.display = "flex";
      });

      //adding link
      let webLink = document.querySelector(".webSajtLabel");
      let link = webLink.querySelector("a");
      link.href = gym.webSajt;
      link.innerHTML = gym.webSajt;
      webLink.style.display = "block";
    }
  }
  CreateGymGallery() {
    //first creating 3 divs for 3 elements: two buttons and an image
    let divPrev, divNext, divImg;
    divPrev = document.createElement("div");
    divNext = document.createElement("div");
    divImg = document.createElement("div");

    divPrev.classList.add("btnDiv");
    divNext.classList.add("btnDiv");
    divImg.classList.add("imageDiv");

    //creting buttons and image elements
    let btnPrevious = document.createElement("button");
    btnPrevious.innerHTML = "<";
    btnPrevious.classList.add("btnForPic");

    let btnNext = document.createElement("button");
    btnNext.innerHTML = ">";
    btnNext.classList.add("btnForPic");

    let img = document.createElement("img");
    img.src = "../Resource/logoWithName.png";
    img.classList.add("gymPic");

    //hiding controls at the beginning
    btnPrevious.style.display = "none";
    btnNext.style.display = "none";
    img.style.display = "none";
    //apending..
    divPrev.appendChild(btnPrevious);
    divImg.appendChild(img);
    divNext.appendChild(btnNext);

    let gymPicDiv = document.querySelector(".gymPicDiv");
    let div = document.createElement("div");
    div.className = "picturesDiv";
    gymPicDiv.appendChild(div);
    div.appendChild(divPrev);
    div.appendChild(divImg);
    div.appendChild(divNext);
  }

  CreateWorkingHours() {
    //adding working hours in chooseGymDiv
    let div = document.querySelector(".chooseGymDiv");
    let div2 = document.createElement("div");
    div2.className = "radnoVremeDiv";
    div.appendChild(div2);

    //adding label with working hours
    let workingHoursPar = document.createElement("p");
    workingHoursPar.classList.add("workingHourPar");
    workingHoursPar.classList.add("slova-smaller");
    workingHoursPar.classList.add("shiftLeft");
    workingHoursPar.innerHTML = `Radno vreme teretane: 6-22h`; //ovde ide chosenGym.RadnoVreme

    //hiding control at the beginning
    workingHoursPar.style.display = "none";
    div2.appendChild(workingHoursPar);
  }
  CreateWebLink(link) {
    let div = document.createElement("div");
    div.classList.add("webSajtDiv");
    let divParent = document.querySelector(".gymPicDiv");
    divParent.appendChild(div);

    let label = document.createElement("label");
    label.classList.add("webSajtLabel");
    label.classList.add("slova-smaller");
    label.innerText = "Za vise informacija o teretani: ";

    let webLink = document.createElement("a");
    webLink.href = link;
    webLink.innerHTML = link;
    label.appendChild(webLink);
    div.appendChild(label);

    //hiding control at the beginning
    label.style.display = "none";
  }
  DrawForm() {
    //creating three divs for three parts
    this.CreateThreeDivs();
    //puting text inside heading div
    this.CreateHeading();

    let div = document.createElement("div");
    div.classList.add("chooseGymDiv2");
    let chooseGym = document.querySelector(".chooseGymDiv");
    chooseGym.appendChild(div);
    //adding text left from the gym picker
    this.CreateGymText(div);
    //adding gym picker
    this.CreateGymPicker(div);
    //adding working hours
    this.CreateWorkingHours();
    //adding hr between chooseGymDiv2 and gymPicDiv
    this.CreateHr(chooseGym)
    //adding gym gallery
    this.CreateGymGallery();
    //adding webLink
    this.CreateWebLink();
  }
  CreateHr(parentDiv) {
    let hr = document.createElement("hr");
    parentDiv.appendChild(hr);
  }
}
