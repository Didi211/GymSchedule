using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    [Table("GYM")]
    public class Gym 
    {
        [Key()]
        [Column("GymID")]
        public int ID { get; set; }

        [Column("Naziv")]
        [MaxLength(50)]
        public string Naziv  { get; set; }

        [Column("RadnoVreme")]
        public string RadnoVreme { get; set; }

        [JsonIgnore]
        public virtual List<User> Klijenti { get; set; }

        [JsonIgnore]
        public virtual List<Termin> ZakazaniTermini { get; set; }
    }
}