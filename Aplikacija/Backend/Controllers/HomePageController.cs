using System;
using System.Threading.Tasks;
using Backend.DB;
using Backend.DTO;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Backend.Helpers;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomePageController : ControllerBase
    {
        //homepage and register page api are here

        #region Properties
        public GymContext Context { get; set; }
        public IDataProvider Provider { get; set; }
        public string Src {get; set; }

        #endregion Properties

        #region Constructor 
        public HomePageController(IDataProvider provider)
        {
           
          
            Provider = provider;
        }

        #endregion Constructor

        #region Get
        
        [Route("GetAllGyms")]
        [HttpGet]
        public async Task<IActionResult> GetAllGyms()
        {
            try
            {
                var listaTeretana = await Provider.GetAllGyms();
                if(!listaTeretana.Any())
                    return StatusCode(204,"Lista teretana je prazna");
                var gymsDTO = DTOHelper.GymsToDTO(listaTeretana,GetSrc()); //mislim da mi ne treba jer imam skroz takav obj na frontu
                return Ok(gymsDTO);
                
            }
            catch(Exception ex)
            {
                if(ex.InnerException != null)
                    return StatusCode(500,ex.InnerException.Message);
                return StatusCode(500,ex.Message);
            }
        }

        [Route("GetGym/{gymID}")]
        [HttpGet]
        public async Task<IActionResult> GetGym([FromRoute] int gymID)
        {
            try
            {
                //id validation
                if(gymID < 1) return StatusCode(400,"GymID < 1");
                var gym = new List<Gym>();
                gym.Add(await Provider.GetGym(gymID));
                
                if(gym == null) return StatusCode(400,"Teretana sa ID-jem: " + gymID+ " ne postoji");

                return Ok(DTOHelper.GymsToDTO(gym,GetSrc()));

            }
            catch(Exception ex)
            {
                if(ex.InnerException != null)
                    return StatusCode(500,ex.InnerException.Message);
                return StatusCode(500,ex.Message);
            }
        
        }

        #endregion Get

        #region Post
        
        [Route("Login")]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] DTOLogin loginUser)
        {
            try
            {
                var korisink = await Provider.Login(loginUser.Username, loginUser.Password);
                if(korisink == null)
                    return StatusCode(400, "Netacan username ili sifra");
                Authenticate(korisink);
                return Ok(korisink);

            }
            catch(Exception ex)
            {
                if(ex.InnerException != null)
                    return StatusCode(500,ex.InnerException.Message);
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
                var validateString = ValidationClass.UserRegisterValidation(registerUser);
                if(validateString != "OK") return StatusCode(400,validateString);
                //transforming to model object
                var userDB = DTOHelper.DTO_To_User(registerUser);
                userDB.ID = 0;
                //interacting with db - creating user
                validateString = await Provider.Register(userDB);
                if(validateString != "OK") return StatusCode(400,ValidationClass.SpojiString("",validateString));
                var usrDB = await Provider.GetUser(registerUser.Username);
                Authenticate(usrDB);
                return Ok(usrDB);

            }
            catch(Exception ex)
            {
                if(ex.InnerException != null)
                    return StatusCode(500,ex.InnerException.Message);
                return StatusCode(500,ex.Message);
            }
        }
        
        #endregion Post

        #region Private
        private void Authenticate(User user)
        {
            var userClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name,user.Ime),
                new Claim(ClaimTypes.Surname, user.Prezime),
                new Claim("UserID",user.ID.ToString()),
                new Claim("GymID",user.GymID.ToString()),
                new Claim("CardNo",user.BrojKartice.ToString())
            };
            
            var userIdentity = new ClaimsIdentity(userClaims, "Gym Identity");

            var userPrincipal = new ClaimsPrincipal(new[] { userIdentity });

            HttpContext.SignInAsync(userPrincipal); 

        }
        private string GetSrc()
        {
            Src = String.Format("{0}://{1}{2}/Images/",
                Request.Scheme,Request.Host,Request.PathBase);
            return Src;
        }
        
        #endregion Private
    }
}