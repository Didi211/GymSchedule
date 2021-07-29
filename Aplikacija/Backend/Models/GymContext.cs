
using Microsoft.EntityFrameworkCore;

namespace Backend.Models
{
    public class GymContext : DbContext
    {
        public DbSet<Gym> Teretane { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Termin> Termini { get; set; }

        public GymContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasIndex(u => u.Username).IsUnique();
            modelBuilder.Entity<User>().HasIndex(u => new 
            {
                u.BrojKartice, u.GymID
            }).IsUnique(true);
            modelBuilder.Entity<User>().HasIndex(u => new 
            {
                u.GymID, u.UserType
            }).IsUnique(true);

            modelBuilder.Entity<Termin>().HasKey(ck => new 
            {
                ck.UserID, ck.GymID
            });
            modelBuilder.Entity<User>().HasOne(u => u.Gym).WithMany(g => g.Klijenti)
                    .OnDelete(DeleteBehavior.ClientSetNull);
        }
    }
}