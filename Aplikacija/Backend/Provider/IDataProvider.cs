using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Models;

namespace Backend.DB
{
    public interface IDataProvider
    {
        //for homepage controller
        Task<IList<Gym>> GetAllGyms();
        Task<Gym> GetGym(int gymID);
        // Task<IList<Pictures>> GetGymPictures(int gymID)
        Task<User> Login(string username, string password);
        Task<string> Register(User user);

        //for clinet homepage controller
        Task<Quote> RandomQuote();
        

    }
}