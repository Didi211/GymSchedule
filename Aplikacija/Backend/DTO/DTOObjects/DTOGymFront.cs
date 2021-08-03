using System.Collections.Generic;
using Backend.Models;

namespace Backend.DTO
{
    public class DTOGymFront
    {
        public int GymID { get; set; } 
        public  string Naziv { get; set; }
        public string RadnoVreme { get; set; }
        public string WebSajt { get; set; }
        public int KapacitetPoSatu { get; set; }
        public IList<DTOPictureFront> Slike { get; set; }
        public DTOGymFront(Gym gym,string src)
        {
            this.GymID = gym.ID;
            this.Naziv = gym.Naziv;
            this.RadnoVreme = gym.RadnoVreme;
            this.KapacitetPoSatu = gym.KapacitetPoSatu;
            this.WebSajt = gym.WebSajt;
            this.Slike = DTOHelper.PicturesToDTO(gym.Pictures,src);
        }
    }    

}