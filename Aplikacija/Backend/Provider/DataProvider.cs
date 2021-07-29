using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Models;
using Microsoft.EntityFrameworkCore;


namespace Backend.DB
{
    public class DataProvider : IDataProvider
    {
        public GymContext Context { get; set; }
        public DataProvider(GymContext context)
        {
            Context = context;
        }
        

        public async Task<IList<Gym>> GetAllGyms()
        {
            var listaTeretana = await Context.Teretane.ToListAsync();
            return listaTeretana;
        }
    }
}