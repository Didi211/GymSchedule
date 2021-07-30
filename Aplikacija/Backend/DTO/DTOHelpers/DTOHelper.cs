using System.Collections.Generic;
using Backend.Models;

namespace Backend.DTO
{
    public class DTOHelper
    {
        public static IList<DTOGymFront> GymsToDTO(IList<Gym> teretane)
        {
            IList<DTOGymFront> gymsDTO = new List<DTOGymFront>();
            foreach(Gym t in teretane)
            {
                DTOGymFront tmp = new DTOGymFront(t);
                gymsDTO.Add(tmp);
            }
            return gymsDTO;
        }
        public static User DTO_To_User(DTOUserFront dtoUser)
        {
            var user = new User();
            user.Ime = dtoUser.Ime;
            user.Prezime = dtoUser.Prezime;
            user.Username = dtoUser.Username;
            user.Password = dtoUser.Password;
            user.BrojKartice = (int)dtoUser.BrojKartice;
            user.GymID = dtoUser.GymID;
            user.Pol = dtoUser.Pol;
            return user;
        }
    }
}