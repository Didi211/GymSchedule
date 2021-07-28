import { Helpers } from "../HelperFunctions";

export class Teretana 
{
    constructor()
    {
        this.Naziv = null;
        this.RadnoVreme = null; //6-22;
        this.KapacitetPoSatu = null; //int
        this.Slike = []; //ne znam kako cu ovo 
        this.Vlasnik = null; 
        this.Radnici = []
    }
    Validate()
    {
        if(!Helpers.ValidateString(this.Naziv)) return false;
        if(!this.ValidateRadnoVreme(this.RadnoVreme)) return false;
        if(this.KapacitetPoSatu < 1) return false;
        // if(this.Slike.)
        if(!Helpers.ValidateString(this.Vlasnik)) return false;
        if(!this.ValidateRadnike()) return false;

        return true;
    }
    ValidateRadnike()
    {
        this.Radnici.forEach(radnik => 
            {
                
                if(!radnik.Validate()) return false;
            })
    }
    ValidateRadnoVreme()
    {
        let sati = this.RadnoVreme.split('-');
        let pocetakRada = parseInt(sati[0]);
        let krajRada = parseInt(sati[1]); 
        if(pocetakRada > 23 && pocetakRada < 1) return false;
        if(krajRada > 23 && krajRada < 1) return false;
        if(pocetakRada > krajRada) return false;
        
        return true;

    }
}