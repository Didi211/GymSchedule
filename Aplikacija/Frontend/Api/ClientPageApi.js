import { ApiClientPageURLS, ApiClientPageURL } from "../apiKonstante.js";
import { User } from "../Classes/User.js";
import { Quote } from "../Classes/Quote.js";
import { Termin } from "../Classes/Termin.js";

export class ClientPageApi {
  constructor() {
    this.baseUrl = ApiClientPageURLS;
  }

  async GetUser(userID) {
    let response = await fetch(`${this.baseUrl}GetUser/${parseInt(userID)}`);
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
    // user.SetImageFromDB(data.profilnaSlika.imageName,data.profilnaSlika.imageSrc);
    return user;
  }

  async GetQuote() {

    var quote = await fetch(`${this.baseUrl}GetQuote`).then( async response =>  {
      var data = await response.json();
      let quote = new Quote(data.content, data.author);
      return quote;
       
    }).catch(err => console.log(err));
    return quote;
    // let response = await fetch(`${this.baseUrl}GetQuote`);
    // let data = await response.json();
    // let quote = new Quote(data.content, data.author);
    // return quote;
  }

  async GetSveTermine(userID) {
    let response = await fetch(`${this.baseUrl}GetSveTermine/${+userID}`);

    if (response.status == 200) {
      let data = await response.json();
      let termini = [];
      data.forEach((t) => {
        let termin = new Termin(t.datum, t.userID, t.gymID);
        termini.push(t);
      });
      return termini;
    } else if (response.status == 204) {

      return [];
    } else {
      let data = await response.json();
      alert(data);
      return null;
    }
  }

  async GetSlobodneTermine(gymid, datum) {
    let response = await fetch(`${this.baseUrl}OsveziPrikazTermina/${gymid}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(datum),
    });

    if (response.status == 200) {
      //ima elemenata u listi
      let data = await response.json();
      let termini = [];
      data.forEach((el ) => { //"2021-08-05T23:00:00" ovako izgleda
          let razdvoji = el.split("T");
          termini.push(razdvoji[0]);
        }
      );
      return termini;
    } else if (response.status == 201) {
      return null;
    } else if (response.status == 204) {
      //prazna lista
      return [];
    } else {
      let data = await response.json();
      console.log(data);
      return new Error("Greska na serverskoj strani");
    }
  }

  async ZakaziTermin(termin) {
      var ok;
      var result = await fetch(`${this.baseUrl}ZakaziTermin`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(termin),
          }).then(response => {
            switch(response.status) {
              case 204: {
                ok = true;
                break;
              }
              case 400 : { 
                alert("Klijent greska");
                ok = false;
                break;
              }
              case 403 : {
                alert("Ne moze vise od dva treninga dnevno.");
                ok = false;
                break;
              }
              default : { 
                alert("Greska na serveru");
                ok = false;
                break;
              }
            }
            return ok;
          }).catch(err => console.error(err));
          console.log(result);
    return result;
  }

  async DeleteTermin(termin) {
    let response = await fetch(`${this.baseUrl}ObrisiTermin`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify(termin),
    });

    if (response.status == 204) {
      return true;
    } else if (response.status == 400) {
      let data = await response.json();
      alert(
        "Doslo je do problema na klijent strani. Check console for more info."
      );
      console.log(data);
      return false;
    } else {
      alert("Doslo je do greske sa serverom");
      return false;
    }
  }

  async ObrisiSveTermine(userID) {
    let response = await fetch(`${this.baseUrl}ObrisiSveTermine/${userID}`,{
      headers : {
        Accept: "application/json",
        "Content-Type" : "application/json",
      },
      method : "DELETE",
    });
    if(response.status == 204) { 
      return true;
    } else if(response.status == 400) { 
      let data = await response.json();
      alert ("Doslo je do problema na klijent strani.Check console for more info.");
      console.log(data);
      return false;
    } else {
      alert("Doslo je do greske sa serverom.");
      return false;
    }

  }

  async DeleteUser(userID) {
    let result = await fetch(`${this.baseUrl}DeleteUser/${userID}`, {
      headers : {
        Accept : "application/json",
        "Content-Type" : "application/json"
      },
      method : "DELETE"
    }).then(response => { 
      let ok;
      switch(response.status) {
        case 204 : {
          ok = true;
          break;
        }
        case 400 : {
          ok = false;
          alert("Klijent greska");
          break;
        }
        default : {
            alert("Server greska");
            ok = false;
            break;
        }
      }
      return ok;
    }).catch(err => console.log(err));
    return result;
  }

  async EditProfile(user) { 
    let result = await fetch(`${this.baseUrl}EditProfil`, {
      headers : {
        Accept : "application/json",
        "Content-Type" : "application/json"
      },
      method : "PUT",
      body : JSON.stringify(user)
    }
    ).then(response => {
      let ok; 
      switch(response.status) {
        case 204 : {
          ok = true;
          break;
        }
        case 400 : {
          ok = false;
          alert("Klijent greska");
          break;
        }
        default : {
            alert("Server greska");
            ok = false;
            break;
        }
      }
      return ok;
    }).catch(err => console.log(err));
    return result;
  }
  
}
