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
    }
}