using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;


namespace Backend.DB
{
    public class DataProvider : IDataProvider
    {
        public GymContext Context { get; set; }
        public IWebHostEnvironment HostEnvironment { get; set; }
        public DataProvider(GymContext context, IWebHostEnvironment hostEnvironment)
        {
            Context = context;
            HostEnvironment = hostEnvironment;
        }
        

        public async Task<IList<Gym>> GetAllGyms()
        {
            var listaTeretana = await Context.Teretane.Include(g => g.Pictures).ToListAsync();
            return listaTeretana;
        }

        public async Task<Gym> GetGym(int gymID)
        {
            var gym = await Context.Teretane.Include(g => g.Pictures).Where(g => g.ID == gymID).FirstOrDefaultAsync();
            foreach(Picture p in gym.Pictures)
            {
                p.ImageSrc = "https://localhost:5001/Images/" + p.ImageName;
            }
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
            user.UserType = "K";
            user.Gym = gym;
            Context.Users.Add(user);
            await Context.SaveChangesAsync();
            return "OK";
        }

        public async Task<Quote> RandomQuote()
        {
            var brCitata = Context.Quotes.Count();
            Random rnd = new Random();
            var randomId = rnd.Next(1,brCitata + 1); //da bi se ukljucio i taj poslednji (ne ide brojanje od 0)
            var quote = await Context.Quotes.FindAsync(randomId);
            return quote;
        }
        public async Task<User> GetUser(int userID)
        {
            var user = await Context.Users.Include(u => u.ProfilnaSlika)
                .Where(u => u.ID == userID).FirstOrDefaultAsync();
            return user;
            
        }
        public async Task<User> GetUser(string username)
        {
            var user = await Context.Users.Include(u => u.ProfilnaSlika)
                .Where(u => u.Username == username).FirstOrDefaultAsync();
            return user;
            
        }
        
        public async Task<IList<Termin>> GetAllTermine(int userID)
        {
            var termini = await Context.Termini.
                Where(t => t.UserID == userID && t.Zavrsen == false).ToListAsync();
            return termini;
        }

        public async Task<string> DeleteTermin(Termin termin)
        {
            var user = await  Context.Users.FindAsync(termin.UserID);
            
            if(user == null) return "Ne postoji korisnik sa tim ID-jem.";
            var result = await Context.Termini.ContainsAsync(termin);
                // .Where(t => t.UserID == termin.UserID && t.Datum == termin.Datum && t.GymID == termin.GymID)
                // .FirstOrDefaultAsync();
            if(!result) return "Ne postoji zakazani trening u tom terminu.";

            Context.Termini.Remove(termin);
            await Context.SaveChangesAsync();
            return "OK";
        }

        public async Task<string> ObrisiSveTermine(int userID)
        {
            var user = await Context.Users.FirstAsync();

            if(user == null) return "Ne postoji korisnik sa tim ID-jem.";

            Context.Termini.RemoveRange(await Context.Termini.Where(t => t.UserID == userID).ToListAsync());
            await Context.SaveChangesAsync();
            return "OK";
            

        }

        public async Task<IList<DateTime>> GetDanasnjeTermine(int gymID, DateTime today)
        {
            
            // vrednosti koje vracam su slobodni termini
            if(today.Date < DateTime.Now.Date)
                return null; //termin iz proslosti 
            
            //treba da proverim za svaki radni sat tog dana da li ima ili nema mesta 
            var gym = await Context.Teretane.FindAsync(gymID);
            var radnoVreme = gym.RadnoVreme.Split('-'); //6-22
            int pocetak,kraj;
            pocetak = int.Parse(radnoVreme[0]);
            kraj = int.Parse(radnoVreme[1]);

            var trSati = 0;
            if(DateTime.Now.Date == today.Date)
            {
                //danasnji termin
                trSati = DateTime.Now.Hour;
            } //else datum iz buducnosti, pocinjemo od pocetka dana 
            
            

            if(trSati > pocetak)
                pocetak = ++trSati; 
                /*da ne pregledava od jutros ako je 6 poslepodne
                manje za pretragu i ti termini sigurno su bili kolko tolko ispunjeni
                pa bi samo mucio dbms za dzabe
                na frontu ce biti automatski podeseno za termine iz proslosti da pise 
                da su vec prosli*/

            IList<DateTime> slobodniTermini = new List<DateTime>();
            
            for(int i = pocetak; i < kraj; i++)
            {
                DateTime svakiSat = new DateTime(
                    today.Year,
                    today.Month,
                    today.Day,
                    i, 0, 0); //i je za sate 
                
                var tmp = svakiSat.ToString("yyyy-MM-dd HH:mm:ss");
                var brojZakazanih = await Context.Termini
                    .Where(t => t.GymID == gymID 
                        && t.Datum == svakiSat.ToString("yyyy-MM-dd HH:mm:ss")).CountAsync();
                if(brojZakazanih < gym.KapacitetPoSatu)
                    slobodniTermini.Add(svakiSat);
                
            }

            return slobodniTermini; 

        }
        public async Task<bool> ZakaziTermin(Termin noviTermin)
        {
            
            var brojZakazanih = await Context.Termini
                .Where(t => t.GymID == noviTermin.GymID
                && t.Datum == noviTermin.Datum).CountAsync();
            var gym = await Context.Teretane.FindAsync(noviTermin.GymID);
            if(brojZakazanih + 1 > gym.KapacitetPoSatu)
               return false;
            
            Context.Termini.Add(noviTermin);
            await Context.SaveChangesAsync();
            return true;
        }

        public async Task<string> PromeniSifru(int userID, string staraSifra, string novaSifra)
        {
            var user = await Context.Users.FindAsync(userID);
            if(user == null ) return "Wrong userID.";
            if(staraSifra != user.Password)
                return "Typed password does not match old password.";
            user.Password = novaSifra;
            Context.Users.Update(user);
            await Context.SaveChangesAsync();
            return "OK";
        }

        public async Task<bool> EditProfil(User user)
        {
            var userDB = await Context.Users.FindAsync(user.ID);
            if (userDB == null)
                return false;
            
            //ubacivanje ili menjanje profilne slike 
            if(user.ProfilnaSlika.ImageFile != null)
            {
                DelteImage(user.ProfilnaSlika.ImageName); //brise sliku iz fajl sistema
                user.ProfilnaSlika.ImageName = await SaveImage(user.ProfilnaSlika.ImageFile); //u useru i dalje imam novu sliku 
            }

            userDB.Ime = user.Ime;
            userDB.Prezime = user.Prezime;
            userDB.BrojKartice = user.BrojKartice;
            userDB.Pol = user.Pol;
            userDB.GymID = user.GymID;

            Context.Users.Update(userDB);
            Context.Pictures.Update(userDB.ProfilnaSlika);

            await Context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteUser(int userID)
        {
            var user = await Context.Users.FindAsync(userID);
            if(user == null) 
                return false;
            DelteImage(user.ProfilnaSlika.ImageName);

            // Context.Pictures.Remove(user.ProfilnaSlika);
            Context.Users.Remove(user); //trigeruje ova linija da se i slika obrise 
            
            await Context.SaveChangesAsync();

            return true;

        }

        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(HostEnvironment.ContentRootPath, "Images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;

        }
       
       public void DelteImage(string imageName)
        {
            var imagePath = Path.Combine(HostEnvironment.ContentRootPath, "Images", imageName);
            if (System.IO.File.Exists(imagePath))
                System.IO.File.Delete(imagePath);
        }
    }

}