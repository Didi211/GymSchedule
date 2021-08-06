using System;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Backend.DB;
using Backend.DTO;
using Backend.Helpers;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    // [Authorize]
    public class ClientController : ControllerBase
    {
        //client page and client profile api are here

        #region Properties
        public GymContext Context { get; set; }
        public IDataProvider Provider { get; set; }
        public string Src { get; set; }
        public IWebHostEnvironment HostEnvironment { get; set; }

        #endregion Properties

        #region Constructor
        public ClientController(IDataProvider provider, IWebHostEnvironment hostEnvironment)
        {
            Provider = provider;
            HostEnvironment = hostEnvironment;
        }

        #endregion Constructor

        #region  Get

        [Route("GetQuote")]
        [HttpGet]
        public async Task<IActionResult> GetRandomQuote() 
        {
            /*da se podesi da se funkcija poziva jednom nedeljno 
            ili da  se podesi nekako da bude jedan citat za jednu nedelju
            i svima da bude isti 
            ili da povlacim uvek zadnji quote, a da svake nedelje "ubacujem po jedan"*/
            try
            {
                var quote = await Provider.RandomQuote();
                return Ok(quote);
            }
            catch(Exception ex)
            {
                return StatusCode(500,ex.Message);
            }
        }

        [Route("GetUser/{userID}")]
        [HttpGet]
        public async Task<IActionResult> GetUser([FromRoute] int userID)
        {
            try
            {
                var validateString = ValidationClass.NumberValidation(userID);
                if(validateString != "OK") 
                    return StatusCode(400, ValidationClass.SpojiString("UserID",validateString));
                var user = await Provider.GetUser(userID);
                user.ProfilnaSlika.ImageSrc = GetSrc() + user.ProfilnaSlika.ImageName;
                if(user == null) return StatusCode(400, "Wrong ID");
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(500,ex.Message);
            }
        }
        
        [Route("GetSveTermine/{userID}")]
        [HttpGet]
        public async Task<IActionResult> GetSveTermine([FromRoute] int userID)
        {
            try
            {
                var validateString = ValidationClass.NumberValidation(userID);
                if(validateString != "OK") 
                    return StatusCode(400, ValidationClass.SpojiString("UserID",validateString));
                //termini ostaju ne brisu se
                //pribavljanje termina koji nisu zavrseni 
                var termini = await Provider.GetAllTermine(userID);
                if(!termini.Any()) 
                    return StatusCode(204);
                return Ok(termini);
                
            }
            catch (Exception ex)
            {
                return StatusCode(500,ex.Message);
            }
        }

        [Route("OsveziPrikazTermina/{gymID}")]
        [HttpPost]
        public async Task<IActionResult> OsveziPrikazTermina([FromRoute] int gymID, [FromBody] string datum)
        {
            //datum je string oblika yyyy-MM-dd
            try
            {
                //gym id validation 
                string validateString = ValidationClass.NumberValidation(gymID);
                if(validateString != "OK")
                    return StatusCode(400, ValidationClass.SpojiString("GymID",validateString));
                var gym = await Provider.GetGym(gymID);
                if(gym == null) return StatusCode(400, "Wrong gymID");

                //converting from string to date time
                var niz = datum.Split('-');
                int godina = int.Parse(niz[0]);
                int mesec = int.Parse(niz[1]);
                int dan = int.Parse(niz[2]);
                DateTime noviDatum = new DateTime(godina,mesec,dan);

                //getting from db
                var termini = await Provider.GetDanasnjeTermine(gymID,noviDatum);
                if(termini == null) return StatusCode(201);
                
                return Ok(DTOHelper.TerminiDatesToDTO(termini));
            }
            catch (Exception ex)
            {
                return StatusCode(500,ex.Message);
            }
        }

       #endregion Get

        #region Post

        [Route("ZakaziTermin")]
        [HttpPost]
        public async Task<IActionResult> ZakaziTermin([FromBody] DTOTerminFront noviTermin)
        {
            //yyyy-MM-dd HH:mm:ss
            try
            {
                //validation 
                string validateString = ValidationClass.NumberValidation(noviTermin.UserID);
                if(validateString != "OK")
                    return StatusCode(400, ValidationClass.SpojiString("UserID", validateString));
                // if(noviTermin.Datum.Date < DateTime.Now.Date 
                DateTime datum = DateTime.Parse(noviTermin.Datum);
                string str = datum.ToString("yyyy-MM-dd HH:mm:ss");
                //     && noviTermin.Datum.Hour < DateTime.Now.Hour)
                //     return StatusCode(400,"Termin nije validan, u proslosti je.");
                //transforming to entity object
                var noviTerminEntity = DTOHelper.DTO_To_Termin(noviTermin); 
                //interacting with db 
                if(!await Provider.ZakaziTermin(noviTerminEntity))
                    return StatusCode(400,"Nema mesta u tom terminu.");
                return StatusCode(204);
                
            }
            catch (Exception ex)
            {
                if(ex.InnerException != null)
                    return StatusCode(500, ex.InnerException.Message);
                return StatusCode(500, ex.Message);
                
            }
        }

        #endregion Post

        #region Put

        [Route("PromeniSifru/{userID}")]
        [HttpPut]
        public async Task<IActionResult> PromeniSifru([FromRoute] int userID, [FromBody] DTOSifraFront sifraObj)
        {
            try
            {
                string validateString = ValidationClass.NumberValidation(userID);
                if(validateString != "OK")
                    return StatusCode(400, ValidationClass.SpojiString("UserID",validateString));
                
                validateString = await Provider.PromeniSifru(userID,sifraObj.StaraSifra, sifraObj.NovaSifra);
                if(validateString != "OK")
                    return StatusCode(400, ValidationClass.SpojiString("",validateString));
                
                return StatusCode(204);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [Route("EditProfil")]
        [HttpPut]
        public async Task<IActionResult> EditProfil([FromBody] DTOUserFront editUser)
        {
            try
            {
                //ovde ide provera sa slikom 
                string validateString = ValidationClass.NumberValidation(editUser.ID);
                if(validateString != "OK")
                    return StatusCode(400, ValidationClass.SpojiString("UserID",validateString));
                
                validateString = ValidationClass.UserEditProfileValidation(editUser);
                if(validateString != "OK") return StatusCode(400,validateString);

                User userEntity = DTOHelper.DTO_To_User(editUser);
                if(!await Provider.EditProfil(userEntity))
                    return StatusCode(400,"Wrong userID"); 
                return StatusCode(204);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        #endregion Put

        #region Delete
        
        [Route("ObrisiTermin")]
        [HttpDelete]
        public async Task<IActionResult> ObrisiTermin([FromBody] DTOTerminFront termin)
        {
            //treba mi datum termina i id klijenta 
            //gym mi ne treba mogu da izvucem iz klijenta 
            try
            {
                //datum vreme u formatu yyyy-MM-dd HH:mm:ss
                
                //userid validation
                string validateString = ValidationClass.NumberValidation(termin.UserID);
                if(validateString != "OK") 
                    return StatusCode(400,ValidationClass.SpojiString("UserID",validateString));

                var terminDB = DTOHelper.DTO_To_Termin(termin);
                validateString = await Provider.DeleteTermin(terminDB);
                if(validateString != "OK") 
                    return StatusCode(400,validateString);
                return StatusCode(204);
            }
            catch (Exception ex)
            {
                return StatusCode(500,ex.InnerException.Message);
            }
        }

        [Route("DeleteUser/{userID}")]
        [HttpDelete]
        public  async Task<IActionResult> DeleteUser([FromRoute] int userID)
        {
            string validateString = ValidationClass.NumberValidation(userID);
                if(validateString != "OK")
                    return StatusCode(400, ValidationClass.SpojiString("UserID",validateString));

            if(!await Provider.DeleteUser(userID))
                return StatusCode(400,"Wrong userID");
            return StatusCode(204);
        }

        #endregion Delete

        #region Private 
        private string GetSrc()
        {
            Src = String.Format("{0}://{1}{2}/Images/",
                Request.Scheme,Request.Host,Request.PathBase);
            return Src;
        }
        #endregion Private 
        
    } 
    


}