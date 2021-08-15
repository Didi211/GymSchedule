import { ApiClientPageURLS, ApiClientPageURL } from "../apiKonstante.js";
import { User } from "../Classes/User.js";
import { Quote } from "../Classes/Quote.js";
import { Termin } from "../Classes/Termin.js";

export class ClientPageApi {
  constructor() {
    this.baseUrl = ApiClientPageURLS;
  }

  async GetUser(userID) {
    try {
      let response = await fetch(`${this.baseUrl}GetUser/${parseInt(userID)}`);
      switch(response.status) {
        case 200: {
          let data = await response.json();
          let user = new User(
            data.id,
            data.ime,
            data.prezime,
            data.pol,
            data.gymID,
            data.username,
            data.password,
            data.brojKartice
          );
          return user;
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
    catch(error) {
      console.error(error);
    }
  }

  async GetQuote() {
    try {
      var response = await fetch(`${this.baseUrl}GetQuote`);
      switch(response.status) {
        case 200: {
          var data = await response.json();
          let quote = new Quote(data.content, data.author);
          return quote;
        }
        default: {
          //500
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
  

  async GetSveTermine(userID) {
    try {
      let response = await fetch(`${this.baseUrl}GetSveTermine/${+userID}`);
      switch(response.status) {
        case 200: {
          let data = await response.json();
          let termini = [];
          data.forEach((t) => {
            let termin = new Termin(t.datum, t.userID, t.gymID);
            termini.push(t);
          });
          return termini;
        }
        case 204: {
          return [];
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
    catch(error) { 
      console.error(error);
      return null;
    }
  }

  async GetSlobodneTermine(gymid, datum) {
    try {
      let response = await fetch(`${this.baseUrl}OsveziPrikazTermina/${gymid}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(datum),
      });
      switch(response.status) {
        case 200: {
          //ima elemenata u listi
          let data = await response.json();
          let termini = [];
          data.forEach((el ) => { //"2021-08-05T23:00:00" ovako izgleda
          let razdvoji = el.split("T");
            termini.push(razdvoji[0]);
          });
          return termini;
        }
        case 201: {
          return null;
        }
        case 204: {
          return [];
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
    catch(error) { 
      console.error(error);
      return null;
    }
  }

  async ZakaziTermin(termin) {
    try {
      let response =  await fetch(`${this.baseUrl}ZakaziTermin`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(termin),
      });
      switch(response.status) {
        case 204: {
          return true;
        }
        case 400: {
          alert(`Client-side error: ${await response.text()}`);
          return false;
        }
        default: {
          alert(`Server-side error: ${await response.text()}`);
          return false;
        }
      }
    }
    catch(error) {
      console.error(error);
      return null;
    }
  }

  async DeleteTermin(termin) {
    try {
      let response = await fetch(`${this.baseUrl}ObrisiTermin`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify(termin),
      });
      switch(response.status) {
        case 204: {
          return true;
        }
        case 400: {
          alert(`Client-side error: ${await response.text()}`);
          return false;
        }
        default: {
          alert(`Server-side error: ${await response.text()}`);
          return false;
        }
      }
    }
    catch(error) {
      console.error(error);
      return false;
    }
  }

  async ObrisiSveTermine(userID) {
    try {
      let response = await fetch(`${this.baseUrl}ObrisiSveTermine/${userID}`,{
        headers : {
          Accept: "application/json",
          "Content-Type" : "application/json",
        },
        method : "DELETE",
      });
      switch(response.status) {
        case 204: {
          return true;
        } 
        case 400: {
          alert(`Client-side error: ${await response.text()}`);
          return false;
        }
        default: {
          alert(`Server-side error: ${await response.text()}`);
          return false;
        }
      }
    }
    catch(error) {
      console.error(error);
      return false;
    }
  }

  async DeleteUser(userID) {
    try { 
      let response =  await fetch(`${this.baseUrl}DeleteUser/${userID}`, {
        headers : {
          Accept : "application/json",
          "Content-Type" : "application/json"
        },
        method : "DELETE"
      });
      switch(response.status) {
        case 204: {
          return true;
        }
        case 400: {
          alert(`Client-side error: ${await response.text()}`);
          return false;
        }
        default: {
          alert(`Server-side error: ${await response.text()}`);
          return false;
        }
      }
    }
    catch(error) { 
      console.error(error);
      return false;
    }
  }

  async EditProfile(user) { 
    try {
      let response = await fetch(`${this.baseUrl}EditProfil`, {
        headers : {
          Accept : "application/json",
          "Content-Type" : "application/json"
        },
        method : "PUT",
        body : JSON.stringify(user)
      });
      switch(response.status) {
        case 204: { 
          return true;
        }
        case 400: {
          alert(`Client-side error: ${await response.text()}`);
          return false;
        }
        default: {
          alert(`Server-side error: ${await response.text()}`);
          return false;
        }
      }
    } 
    catch(error) {
      console.error(error);
    }
  }

  async ChangePassword(userid, sifreObj) {
    try {
      let response = await fetch(`${this.baseUrl}PromeniSifru/${userid}`,
      {
        headers : {
          Accept: "application/json",
          "Content-type" : "application/json"
        },
        method: "PUT",
        body: JSON.stringify(sifreObj)
      });
      switch(response.status) {
        case 204: {
          return true;
        }
        case 400: {
          alert(`Client-side error: ${await response.text()}`);
          return false;
        }
        default: {
          alert(`Server-side error: ${await response.text()}`);
          return false;
        }
      }
    }
    catch(error) {
      console.error(error);
      return false;
    }
  }
}
