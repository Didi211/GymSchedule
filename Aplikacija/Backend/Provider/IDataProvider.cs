using System;
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
        Task<User> GetUser(int userID);
        Task<User> GetUser(string username);

        Task<IList<Termin>> GetAllTermine(int userID);
        Task<string> DeleteTermin(Termin termin);
        Task<IList<DateTime>> GetDanasnjeTermine(int gymID, DateTime today);
        Task<bool> ZakaziTermin(Termin termin);
        Task<string> PromeniSifru(int userID,string staraSifra, string novSifra);
        Task<bool> EditProfil(User user);
        Task<bool> DeleteUser(int userID);



    }
}