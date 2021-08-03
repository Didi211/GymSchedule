import { Helpers } from "../HelperFunctions.js";

export class User
{
    constructor(id,ime,prezime,pol,teretana,username,password,cardNo)
    { 
        this.Helper = new Helpers();
        this.ID = id;
        this.ime = ime;
        this.prezime = prezime;
        this.pol = pol;
        this.teretana = teretana;
        this.username = username;
        this.password = password;
        this.brojKartice = cardNo;
        this.imageName = null;
        this.imageSrc = null;
        this.imageFile = null;
        
    }

    setImageFromControls(imgFile)
    {
        this.imageFile = imgFile;
    }

    SetImageFromDB(imgName,imgSrc)
    {
        this.imageName = imgName;
        this.imageSrc = imgSrc;
    }
    Validate()
    {
        if(!this.ValidateString(this.Ime)) return false;
        if(!this.ValidateString(this.Prezime)) return false;
        if(!this.ValidatePol()) return false;
        if(!this.ValidateString(this.Teretana)) return false;
        if(!this.ValidateString(this.Username)) return false;
        if(!this.ValidateString(this.Password)) return false;
        if(!this.ValidateBrKartice()) return false;


        return true;
    }
    ValidateBrKartice() // string je u pitanju 
    {
        if(!this.ValidateString(this.BrojKartice.toString())) return false;
        if(this.BrojKartice < 0) return false;
        return true;
    }
    ValidatePol()
    {
        if(this.Pol === "M") return true;
        if(this.Pol === "F") return true;        
        return false;
    }
    ValidateString(word)
    {
        return this.Helper.ValidateString(word);
    }
}