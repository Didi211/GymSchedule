using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    [Table("TERMIN")]
    public class Termin 
    {
        [JsonIgnore]
        public virtual User User { get; set;}

        [Column("UserID")]
        public int UserID { get; set; }

        
        [JsonIgnore]
        public virtual Gym Gym { get; set;}

        [Column("GymID")]
        public int GymID { get; set; }

        [Column("Datum")]
        [Required()]
        public DateTime Datum { get; set; }

    }
}