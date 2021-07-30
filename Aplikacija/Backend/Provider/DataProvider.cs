using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<Gym> GetGym(int gymID)
        {
            var gym = await Context.Teretane.FindAsync(gymID);
            return gym;
        }

        public async Task<User> Login(string username, string password)
        {
            var user = await Context.Users
                    .Where(u => u.Username == username).FirstOrDefaultAsync();
            if (user == null)
                return user;
            if(user.Password != password)
                return null;
            return user;
        }

        public async Task<string> Register(User user)
        {
            //validation for username, and gym 
            var twinUser = await Context.Users.Where(u => u.Username == user.Username).FirstOrDefaultAsync();
            if(twinUser != null) return "Object with username: " + user.Username + " already exists."; 
            var gym = await Context.Teretane.FindAsync(user.GymID);
            if(gym == null) return "Gym with GymID: " + user.GymID + " doesn't exist in database.";
            Context.Users.Add(user);
            await Context.SaveChangesAsync();
            return "OK";
        }

        public async Task<Quote> RandomQuote()
        {
            var brCitata = Context.Quotes.Count();
            Random rnd = new Random();
            var randomId = rnd.Next(1,brCitata); //da bi se ukljucio i taj poslednji (ne ide brojanje od 0)
            var quote = await Context.Quotes.FindAsync(randomId);
            return quote;
        }
    }
}