import { Helpers } from "../HelperFunctions.js";

export class User {
  constructor(id, ime, prezime, pol, teretana, username, password, cardNo) {
    this.Helper = new Helpers();
    this.id = id;
    this.ime = ime;
    this.prezime = prezime;
    this.pol = pol;
    this.gymID = teretana;
    this.username = username;
    this.password = password;
    this.brojKartice = cardNo;
    // this.imageName = null;
    // this.imageSrc = null;
    // this.imageFile = null;
  }

  // setImageFromControls(imgFile) {
  //   this.imageFile = imgFile;
  // }

  // SetImageFromDB(imgName, imgSrc) {
  //   this.imageName = imgName;
  //   this.imageSrc = imgSrc;
  // }
  Validate(regFlag) {
    
    if (!this.ValidateString(this.ime)) return false;
    if (!this.ValidateString(this.prezime)) return false;
    if (!this.ValidatePol()) return false;
    if (!this.ValidateString(this.gymID.toString())) return false;
    if (!this.ValidateBrKartice()) return false;
    if(regFlag) { 
      if (!this.ValidateString(this.username)) return false;
      if (!this.ValidateString(this.password)) return false;
    }

    return true;
  }
  ValidateBrKartice() { // string je u pitanju
    if (!this.ValidateString(this.brojKartice.toString())) return false;
    if (this.brojKartice < 0) return false;
    return true;
  }
  ValidatePol() {
    if (this.pol === "M") return true;
    if (this.pol === "F") return true;
    return false;
  }
  ValidateString(word) {
    return this.Helper.ValidateString(word);
  }
}
