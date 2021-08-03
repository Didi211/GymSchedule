import { ApiHomePageURLS,ApiHomePageURL } from "../apiKonstante.js";
import { Slika } from "../Classes/Slika.js";
import { Teretana } from "../Classes/Teretana.js";
import { CircularDLL } from "../LinkedList/CircularDLL.js";

export class HomePageApi
{
    constructor() 
    {
        this.baseURL = ApiHomePageURLS;
    }

    async GetAllGyms()
    {
        let response =  await fetch(`${this.baseURL}GetAllGyms`);
        let data = await response.json();
        let gyms = [];
        data.forEach(el => {
            var teretana = new Teretana(el.gymID,el.naziv,el.radnoVreme,el.kapacitetPoSatu,el.webSajt);
            gyms.push(teretana);
            el.slike.forEach(pic => {
                var slika = new Slika(pic.id,pic.imageName,pic.imageSrc);
                teretana.slike.push(slika);
            });
        });
        return gyms;
    }

    async GetGym(gymID)
    {
        let response = await fetch(`${this.baseURL}GetGym/${parseInt(gymID)}`);
        let data = await response.json();
        let gym = new Teretana(data[0].gymID,data[0].naziv,data[0].radnoVreme,data[0].kapacitetPoSatu,data[0].webSajt);
        data[0].slike.forEach(pic => 
            {
                let slika = new Slika(pic.id,pic.imageName,pic.imageSrc);
                gym.slike.push(slika);
                
            });
        gym.SlikeDLL = new CircularDLL();
        gym.SlikeDLL.pushArray(gym.slike);
        
        return gym;
    }
    async Login(user)
    {
        try
        {
            let response = await fetch(`${this.baseURL}Login`,
            {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(user)
            });
            let data = await response.json();
            let returnedUser = new Object();
            returnedUser.username = data.username;
            returnedUser.password = data.password;
            console.log(data);
            debugger
            returnedUser.id = data.id;
            return returnedUser;
           

        }
        catch(error)
        {
            console.log(error)
        }
    }
}