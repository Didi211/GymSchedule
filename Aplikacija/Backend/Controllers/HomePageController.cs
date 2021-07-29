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
        public async Task<IActionResult> GetAllGyms()
        {
            try
            {
                var listaTeretana = await Provider.GetAllGyms();
                if(!listaTeretana.Any())
                    return StatusCode(204,"Lista teretana je prazna");
                var gymsDTO = DTOHelper.GymsToDTO(listaTeretana);
                return Ok(gymsDTO);
                
            }
            catch(Exception ex)
            {
                return StatusCode(500,ex.Message);
            }
        }
    } 
}