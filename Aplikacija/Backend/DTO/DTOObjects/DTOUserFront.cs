namespace Backend.DTO
{
    public class DTOUserFront
    {
        

   
        public string Ime {get; set; }
        public string Prezime {get; set; }
        public string Username {get; set; }
        public string Password {get; set; }
        public string Pol { get; set; }
        public int? BrojKartice { get; set; } //nullable jer se isti objekat koristi kod login-a 
        public int? GymID { get; set; }  //ali zato ide provera kod registracije 
    }
}