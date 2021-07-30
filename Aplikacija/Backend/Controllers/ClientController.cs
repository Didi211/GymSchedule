using System;
using System.Threading.Tasks;
using Backend.DB;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClientController : ControllerBase
    {
        //client page and client profile api are here
        public GymContext Context { get; set; }
        public IDataProvider Provider { get; set; }
        public ClientController(IDataProvider provider)
        {
            Provider = provider;
        }
        [Route("RandomQuote")]
        [HttpGet]
        public async Task<IActionResult> GetRandomQuote()
        {
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

        
    } 
}