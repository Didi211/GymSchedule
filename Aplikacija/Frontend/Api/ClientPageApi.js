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
      data.gymID,
      data.username,
      data.password,
      data.brojKartice
    );
    return user;
  }

  async GetQuote() {
    let response = await fetch(`${this.baseUrl}GetQuote`);
    let data = await response.json();
    let quote = new Quote(data.content, data.author);
    return quote;
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
    try {
      //sredi fetcheve da mozes da obradis i primis izuzetke sa bekenda

      let response = await fetch(`${this.baseUrl}ZakaziTermin`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
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
      } else {
        alert("Doslo je do greske sa serverom");
        return false;
      }
    } catch (ex) {
      console.error(ex);
    }
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
}
