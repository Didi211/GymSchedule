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
      tabela.classList.add("headerTable");   
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
   
      //link for logo 
      let hyperlink = document.createElement("a");
      hyperlink.classList.add("logoLink");

      //logo
      let logo = document.createElement("img");
      logo.classList.add("logo");
      logo.src = this.putanja + "logoWithName.png";
   
      //appending to DOM
      
      
      // red.headers[1].appendChild(logo);
      hyperlink.appendChild(logo);
      red.cells[1].appendChild(hyperlink);
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
      
      //hyperlink
      let hyperlink = document.createElement("a");
      hyperlink.classList.add("backArrowLink");

      //kreira se dugme za nazad
      let backArrowBtn = document.createElement("img");
      backArrowBtn.src = this.putanja + "backarrowbutton.png";
      backArrowBtn.classList.add("backArrowBtn");
   
      prvaCelija.appendChild(hyperlink);
      hyperlink.appendChild(backArrowBtn);
   
   }
   
   createLogOutButton()
   {
      //kreira se dugme za logout
      
      let trecaCelija = document.querySelector(".trecaCelija");
   
      //hyperlink 
      let hyperlink = document.createElement("a");
      hyperlink.classList.add("logOutLink");

      //kreira se logout dugme
      let logOutBtn = document.createElement("img");
      logOutBtn.src = this.putanja + "logout.png";
      logOutBtn.classList.add("logOutBtn");
   
      hyperlink.appendChild(logOutBtn);
      trecaCelija.appendChild(hyperlink);
   }
   
   createProfileButton()
   {
      //kreira se dugme za moj profil
   
      let prvaCelija = document.querySelector(".prvaCelija");
   
      //hyperlink
      let hyperlink = document.createElement("a");
      hyperlink.classList.add("profileIconLink");

      let profileBtn = document.createElement("img");
      profileBtn.src = this.putanja + "profile.jpg";
      profileBtn.classList.add("profileBtn");
      
      hyperlink.appendChild(profileBtn);
      prvaCelija.appendChild(hyperlink);
   }

   addGoBackUrl(url)
   {
      let backArrow = document.querySelector(".backArrowLink");
      backArrow.href = url;
   }

   addLogOutUrl(url)
   {
      let logOut = document.querySelector(".logOutLink");
      logOut.href = url;
   }

   addLogoUrl(url)
   {
      let logo = document.querySelector(".logoLink");
      logo.href = url;
   }

   addProfileIconUrl(url)
   {
      let profileIcon = document.querySelector(".profileIconLink") ;
      profileIcon.href = url;
   }


}
