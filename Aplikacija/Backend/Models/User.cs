using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    [Table("USER")]
    public class User 
    {
        [Key()]
        [Column("UserID")]
        public int ID { get; set; }

        [Column("Ime")]
        [MaxLength(50)]
        public string Ime {get; set; }
        
        [Column("Prezime")]
        [MaxLength(50)]
        public string Prezime {get; set; }
        
        [Column("Username")]
        [Required()]
        [MaxLength(50)]
        public string Username {get; set; }

        [Column("Password")]
        [Required()]
        [MaxLength(50)]
        public string Password {get; set; }

        [Column("Pol")]
        [Required()]
        public string Pol { get; set; }

        [Column("BrojKartice")]
        [Required()]
        [MaxLength(10)]
        public int BrojKartice { get; set; }

        public virtual Picture ProfilnaSlika { get; set; }
        
        [Column("GymID")]
        public int? GymID { get; set; }

        [JsonIgnore]
        public virtual Gym Gym { get; set; } //svi korisnici interaguju sa teretanom, jedan vlasnik, n radnika, m klijenata

        [JsonIgnore]
        public virtual List<Termin> ZakazaniTermini { get; set; }

        [Column("UserType")]
        [DefaultValue("K")]
        public string UserType { get; set; } //Klijenti Radnici i Admini 




    }
}