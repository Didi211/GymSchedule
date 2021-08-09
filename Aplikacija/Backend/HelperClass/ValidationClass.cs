using System.Linq;
using Backend.DTO;

namespace Backend.Helpers
{
    public class ValidationClass
    {
        public static string UserEditProfileValidation(DTOUserFront user)
        {
            
            var validateString = StringValidation(user.Ime,false);
            if(validateString != "OK") return SpojiString("Ime",validateString);

            validateString = StringValidation(user.Prezime,false);
            if(validateString != "OK") return SpojiString("Prezime",validateString);
            
            validateString = Polvalidation(user.Pol);
            if(validateString != "OK") return SpojiString("Pol",validateString);

            validateString = NumberValidation(user.BrojKartice);
            if(validateString != "OK") return SpojiString("Broj kartice",validateString);

            validateString = NumberValidation(user.GymID);
            if(validateString != "OK") return SpojiString("GymID",validateString);
            return "OK";
        }
        public static string UserRegisterValidation(DTOUserFront user)
        {
            var validateString = StringValidation(user.Username,true);
            if(validateString != "OK") return SpojiString("Username",validateString);

            validateString = StringValidation(user.Password,true);
            if(validateString != "OK") return SpojiString("Password",validateString);
            
            validateString = StringValidation(user.Ime,false);
            if(validateString != "OK") return SpojiString("Ime",validateString);

            validateString = StringValidation(user.Prezime,false);
            if(validateString != "OK") return SpojiString("Prezime",validateString);
            
            validateString = Polvalidation(user.Pol);
            if(validateString != "OK") return SpojiString("Pol",validateString);

            validateString = NumberValidation(user.BrojKartice);
            if(validateString != "OK") return SpojiString("Broj kartice",validateString);

            validateString = NumberValidation(user.GymID);
            if(validateString != "OK") return SpojiString("GymID",validateString);
            return "OK";
        }
        public static string StringValidation(string text,bool mixedChars)
        {
            if(text == null) return   " is null.";
            if(text == "") return  " is an empty string.";
            if(mixedChars) return "OK";
            text = text.ToLower();
            if(text.All(slovo => slovo >= 'a'))
                if(text.All(slovo => slovo <= 'z'))
                    return "OK";
            return  " does not contain only letters.";
        }
        public static string Polvalidation(string pol)
        {
            if(pol == "M") return "OK";
            if(pol == "F") return "OK";
            return  " has to be \"M\" or \"F\""; 
        }
        public static string NumberValidation(int? number)
        {
            if(number == null) return " is null";
            if(number < 1) return " is les than 1";
            return "OK";
        }
        public static string SpojiString(string thing, string reason)
        {
            string rec = "Validation failed: ";
            return rec + thing + reason;

        }    
    }
}