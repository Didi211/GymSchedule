export class Headers{

   constructor()
   {
      this.putanja = "../Resource/";
   }

   createHeader(){ 
      //creating elements
      let body = document.body;
      let header = document.createElement("header");
      let blueDiv = document.createElement("div");
      blueDiv.className = "blueDiv"
   
   
      //creating table for even placement
      let tabela = document.createElement("table");
      let tableBody = document.createElement("tbody");
      
      tabela.appendChild(tableBody);
   
      let red = document.createElement("tr");
      tableBody.appendChild(red);
      let celije = ["prvaCelija","drugaCelija","trecaCelija"];
      for( let i = 0; i < 3; i++)
      {
         let cell = document.createElement("td");
         cell.className = celije[i];
         red.appendChild(cell);
         
      }
      
      blueDiv.appendChild(tabela);
   
      //logo
      let logo = document.createElement("img");
      logo.classList.add("logo");
      logo.src = this.putanja + "logoWithName.png";
   
      //appending to DOM
      
      
      // red.headers[1].appendChild(logo);
      red.cells[1].appendChild(logo);
      header.appendChild(blueDiv);
      body.appendChild(header);
      
   }
   
   createRegisterHeader()
   {
      this.createHeader();
      this.createBackArrowButton();
   }
   
   createClientHeader()
   {
      this.createHeader();
      this.createProfileButton();
      this.createLogOutButton();
   }
   
   createProfileHeader()
   {
      this.createHeader();
      this.createBackArrowButton();
      this.createLogOutButton();
   }
   
   createBackArrowButton()
   {
      //kreira se u levom delu header-a 
      
      let prvaCelija = document.querySelector(".prvaCelija");
      
      //kreira se dugme za nazad
      let backArrowBtn = document.createElement("img");
      backArrowBtn.src = this.putanja + "backarrowbutton.png";
      backArrowBtn.classList.add("backArrowBtn");
   
      prvaCelija.appendChild(backArrowBtn);
   
   }
   
   createLogOutButton()
   {
      //kreira se dugme za logout
      
      let trecaCelija = document.querySelector(".trecaCelija");
   
      //kreira se logout dugme
      let logOutBtn = document.createElement("img");
      logOutBtn.src = this.putanja + "logout.png";
      logOutBtn.classList.add("logOutBtn");
   
      trecaCelija.appendChild(logOutBtn);
   }
   
   createProfileButton()
   {
      //kreira se dugme za moj profil
   
      let prvaCelija = document.querySelector(".prvaCelija");
   
      // let children = prvaCelija.childNodes;
      // prvaCelija.removeChildren(children);
      //creating profile button
      let profileBtn = document.createElement("img");
      profileBtn.src = this.putanja + "profile.jpg";
      profileBtn.classList.add("profileBtn");
   
      prvaCelija.appendChild(profileBtn);
   }

}
