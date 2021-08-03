import { ApiClientPageURLS,ApiClientPageURL } from "../apiKonstante.js";
import { User } from "../Classes/User.js";
import { Quote } from "../Classes/Quote.js";

export class ClientPageApi
{
    constructor()
    {
        this.baseUrl = ApiClientPageURLS ;
    }

    async GetUser(userID)
    {
        let response = await fetch(`${this.baseUrl}GetUser/${parseInt(userID)}`);
        let data = await response.json();
        let user = new User(data.id,data.ime,data.prezime,
                data.gymID,data.username,data.password,data.brojKartice);
        return user;
    }

    async GetQuote()
    {
        let response = await fetch(`${this.baseUrl}GetQuote`);
        let data = await response.json();
        let quote = new Quote(data.content,data.author);
        return quote;
    }
  
}
