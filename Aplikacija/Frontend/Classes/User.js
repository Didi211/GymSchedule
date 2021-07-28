import { Helpers } from "../HelperFunctions.js";

export class User
{
    constructor()
    { 
        this.Ime = null;
        this.Prezime = null;
        this.Pol = null;
        this.Teretana = null;
        this.Username = null;
        this.Password = null;
        this.BrojKartice = null;
        this.ProfilnaSlika = null;
        this.TipKorisnika = null;
        
    }
    
    Validate()
    {
        if(!this.ValidateString(this.Ime)) return false;
        if(!this.ValidateString(this.Prezime)) return false;
        if(!this.ValidatePol()) return false;
        if(!this.ValidateString(this.teretana)) return false;
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
        return Helpers.ValidateString(word);
    }
}