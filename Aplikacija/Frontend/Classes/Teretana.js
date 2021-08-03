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
   
}