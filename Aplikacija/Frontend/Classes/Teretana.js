import { Helpers } from "../HelperFunctions.js";

export class Teretana 
{
    constructor(id,naziv,radnoVreme,kapacitetPoSatu,webSajt)
    {
        this.Helper = new Helpers();
        this.gymID = id;
        this.naziv = naziv;
        this.radnoVreme = radnoVreme; //6-22;
        this.kapacitetPoSatu = kapacitetPoSatu; //int
        this.webSajt = webSajt;
        this.slike = [];
        this.SlikeDLL = [];
         //ne znam kako cu ovo 
    }
    Validate()
    {
        if(!this.Helper.ValidateString(this.Naziv)) return false;
        if(!this.ValidateRadnoVreme(this.RadnoVreme)) return false;
        if(this.KapacitetPoSatu < 1) return false;
        // if(this.Slike.)

        return true;
    }
  
    ValidateRadnoVreme()
    {
        let sati = this.RadnoVreme.split('-');
        let pocetakRada = parseInt(sati[0]);
        let krajRada = parseInt(sati[1]); 
        if(pocetakRada > 24 && pocetakRada < 1) return false;
        if(krajRada > 24 && krajRada < 1) return false;
        if(pocetakRada > krajRada) return false;
        
        return true;

    }
}