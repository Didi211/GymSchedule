using System;
using System.Threading.Tasks;
using Backend.DB;
using Backend.DTO;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomePageController : ControllerBase
    {
        //homepage and register page api are here
        public GymContext Context { get; set; }
        public IDataProvider Provider { get; set; }
        public HomePageController(IDataProvider provider)
        {
            Provider = provider;
        }
        [Route("GetAllGyms")]
        [HttpGet]
        public async Task<IActionResult> GetAllGyms()
        {
            try
            {
                var listaTeretana = await Provider.GetAllGyms();
                if(!listaTeretana.Any())
                    return StatusCode(204,"Lista teretana je prazna");
                var gymsDTO = DTOHelper.GymsToDTO(listaTeretana); //mislim da mi ne treba jer imam skroz takav obj na frontu
                return Ok(gymsDTO);
                
            }
            catch(Exception ex)
            {
                return StatusCode(500,ex.Message);
            }
        }

        [Route("GetPicturesForGym/{gymID}")]
        [HttpGet]
        public async Task<IActionResult> GetPicturesForGym([FromRoute] int gymID)
        {
            //id validation
            if(gymID < 1) return StatusCode(400,"GymID < 1");
            var gym = await Provider.GetGym(gymID);
            if(gym == null) return StatusCode(400,"Teretana sa ID-jem: " + gymID+ " ne postoji");

            //getting the pictures
            // var slike = await Provider.GetGymPictures(gymID);
            return StatusCode(404, "Function not done!!!");
        }

        [Route("Login")]
        [HttpGet]
        public async Task<IActionResult> Login(DTOUserFront loginUser)
        {
            try
            {
                var korisink = await Provider.Login(loginUser.Username, loginUser.Password);
                if(korisink == null)
                    return StatusCode(400, "Netacan username ili sifra");
                return Ok(korisink);

            }
            catch(Exception ex)
            {
                return StatusCode(500,ex.Message);
            }
        }

        [Route("Register")]
        [HttpPost]
        public async Task<IActionResult> Register(DTOUserFront registerUser)
        {
            try
            {
                //user validation 
                var validateString = UserRegisterValidation(registerUser);
                if(validateString != "OK") return StatusCode(400,validateString);
                //transforming to model object
                var userDB = DTOHelper.DTO_To_User(registerUser);
                //interacting with db - creating user
                validateString = await Provider.Register(userDB);
                if(validateString != "OK") return StatusCode(400,SpojiString("",validateString));
                return StatusCode(204);

            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        private string UserRegisterValidation(DTOUserFront user)
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
        private string StringValidation(string text,bool mixedChars)
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
        private string Polvalidation(string pol)
        {
            if(pol == "M") return "OK";
            if(pol == "F") return "OK";
            return  " has to be \"M\" or \"F\""; 
        }
        private string NumberValidation(int? number)
        {
            if(number == null) return " is null";
            if(number < 1) return " is les than 1";
            return "OK";
        }
        private string SpojiString(string thing, string reason)
        {
            string rec = "Validation failed: ";
            return rec + thing + reason;

        }
    }
}