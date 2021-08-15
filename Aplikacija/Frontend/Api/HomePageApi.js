import { ApiHomePageURLS, ApiHomePageURL } from "../apiKonstante.js";
import { Slika } from "../Classes/Slika.js";
import { Teretana } from "../Classes/Teretana.js";
import { CircularDLL } from "../LinkedList/CircularDLL.js";

export class HomePageApi {
  constructor() {
    this.baseURL = ApiHomePageURLS;
  }

  async GetAllGyms() {
    try {
      let response = await fetch(`${this.baseURL}GetAllGyms`);
      switch(response.status) {
        case 200 : {
          let data = await response.json();
          let gyms = [];
          data.forEach((el) => {
            var teretana = new Teretana(
              el.gymID,
              el.naziv,
              el.radnoVreme,
              el.kapacitetPoSatu,
              el.webSajt
            );
            gyms.push(teretana);
            el.slike.forEach((pic) => {
              var slika = new Slika(pic.id, pic.imageName, pic.imageSrc);
              teretana.slike.push(slika);
            });
          });
          return gyms;
        }
        case 204: {
          alert(await response.text());
          return null;
        }
        default: {
          alert(`Server-side error: ${await response.text()}`);
          return null;
        }
        
      }
    }
    catch(error) {
      console.error(error);
      return null;
    }
  }

  async GetGym(gymID) {
    try {
      let response = await fetch(`${this.baseURL}GetGym/${parseInt(gymID)}`);
      switch(response.status) {
        case 200: {
          let data = await response.json();
          let gym = new Teretana(
            data[0].gymID,
            data[0].naziv,
            data[0].radnoVreme,
            data[0].kapacitetPoSatu,
            data[0].webSajt
          );
          data[0].slike.forEach((pic) => {
            let slika = new Slika(pic.id, pic.imageName, pic.imageSrc);
              gym.slike.push(slika);
          });
          gym.SlikeDLL = new CircularDLL();
          gym.SlikeDLL.pushArray(gym.slike);
          return gym;
        }
        case 400: {
          alert(`Client-side error: ${await response.text()}`);
          return null;
        }
        default: {
          //status code 500 or something else 
          alert(`Server-side error: ${await response.text()}`);
          return null;
        }
      }
    }
    catch(err) {
      console.log(err);
    }

  }
  async Login(user) {
    try {
      let response = await fetch(`${this.baseURL}Login`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(user),
      });
      switch(response.status) {
        case 200: {
          let data = await response.json();
          let returnedUser = new Object();
          returnedUser.username = data.username;
          returnedUser.password = data.password;
          returnedUser.id = data.id;
          returnedUser.gymid = data.gymID;
          return returnedUser;
        }
        case 400: { 
          alert(`Client-side error: ${await response.text()}`);
          return null;
        }
        default: {
          alert(`Server-side error: ${await response.text()}`);
          return null;
        }
      }
    } 
    catch (error) {
      console.error(error);
      return null;
    }
  }
  async Register(user) {
    try {
      let response = await fetch(`${this.baseURL}Register`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(user),
      });
      switch(response.status) {
        case 200: {
          let data = await response.json();
          let returnedUser = new Object();
          returnedUser.username = data.username;
          returnedUser.password = data.password;
          returnedUser.id = data.id;
          returnedUser.gymid = data.gymID;      
          return returnedUser;
        }
        case 400: {
          alert(`Client-side error: ${await response.text()}`);
          return null;
        }
        default: {
          //error 500
          alert(`Server-side error: ${await response.text()}`);
          return null;
        }
      }
    }
    catch(error) {
      console.error(error);
      return null;
    }
  }
}
