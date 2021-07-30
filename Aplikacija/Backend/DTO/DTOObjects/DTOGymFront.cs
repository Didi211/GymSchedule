using Backend.Models;

namespace Backend.DTO
{
    public class DTOGymFront
    {
        public int GymID { get; set; } 
        public  string Naziv { get; set; }
        public DTOGymFront(Gym gym)
        {
            this.GymID = gym.ID;
            this.Naziv = gym.Naziv;
        }
    }    

}