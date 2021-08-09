using System;
using System.Collections.Generic;
using Backend.Models;

namespace Backend.DTO
{
    public class DTOHelper
    {
        public static IList<string> TerminiDatesToDTO(IList<DateTime> terminiDatumi)
        {
            IList<string> nizTermina = new List<string>();
            foreach(DateTime termin in terminiDatumi)
            {
                var datum = termin.ToString("yyyy-MM-dd HH:mm:ss");
                nizTermina.Add(datum);
            }
            return nizTermina;
        }
        public static IList<DTOGymFront> GymsToDTO(IList<Gym> teretane,string src)
        {
            IList<DTOGymFront> gymsDTO = new List<DTOGymFront>();
            foreach(Gym t in teretane)
            {
                DTOGymFront tmp = new DTOGymFront(t,src);
                gymsDTO.Add(tmp);
            }
            return gymsDTO;
        }

        public static IList<DTOPictureFront> PicturesToDTO(IList<Picture> slike,string src )
        {
            IList<DTOPictureFront> dtoSlike = new List<DTOPictureFront>();
            foreach(Picture p in slike)
            {
                DTOPictureFront pic = new DTOPictureFront();
                pic.ID = p.ID;
                pic.ImageName = p.ImageName;
                pic.ImageSrc = src + p.ImageName;

                dtoSlike.Add(pic);
            }
            return dtoSlike;
        }

        // public static DTOUserFront UserToDTO(User user)
        // {
            
        // }
        public static User DTO_To_User(DTOUserFront dtoUser)
        {
            var user = new User();
            user.ID = dtoUser.ID;
            user.Ime = dtoUser.Ime;
            user.Prezime = dtoUser.Prezime;
            user.Username = dtoUser.Username;
            user.Password = dtoUser.Password;
            user.BrojKartice = (int)dtoUser.BrojKartice;
            user.GymID = dtoUser.GymID;
            user.Pol = dtoUser.Pol;
            // user.ProfilnaSlika = new Picture(dtoUser.Slika);
            return user;
        }
        public static Termin DTO_To_Termin(DTOTerminFront dtoTermin)
        {
            var termin = new Termin();
            termin.UserID = dtoTermin.UserID;
            termin.GymID = dtoTermin.GymID;
            termin.Datum = dtoTermin.Datum.ToString();
            termin.Zavrsen = false;
            return termin;
        }
    }
}