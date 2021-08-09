import { ClientPageApi } from "../Api/ClientPageApi.js";
import { Helpers } from "../HelperFunctions.js";
import { COLORS } from "../boje.js";
export class UserHelper {
  constructor() {
      this.clienApi = new ClientPageApi();
      this.helper = new Helpers();
  }

  ZabraniTermin(indeks) {
    let restrictDiv = document.getElementById(`${indeks}`).parentElement;
    if(restrictDiv.style.backgroundColor != COLORS.Siva 
        && restrictDiv.style.backgroundColor != COLORS.Zuta) {
      restrictDiv.style.backgroundColor = COLORS.Crvena;
      let zakaziBtn = restrictDiv.querySelector(".zakaziBtn");
      this.helper.ShowHideButton(zakaziBtn,false);
    }
  }
  ZabraniSusedneTermine(zakaziBtn,gym) {
    let niz = gym.radnoVreme.split('-');
    let pocetak = +niz[0];
    let kraj = +niz[1];
    let divInd = +zakaziBtn.id;
    if(pocetak == divInd) {
      //prvi termin za taj dan nema prethodni, radimo samo next termin
      this.ZabraniTermin(++divInd)
    } else if(--kraj == divInd) {
      //zadnji termin za taj dan nema sledeci, radimo samo prev termin
      this.ZabraniTermin(--divInd);
    }
    else {
      divInd = +zakaziBtn.id;
      this.ZabraniTermin(++divInd);
      divInd = +zakaziBtn.id;
      this.ZabraniTermin(--divInd);
    }
  }

  ObojiDiv(div,boja) {
      div.style.backgroundColor = boja;
  }
}
