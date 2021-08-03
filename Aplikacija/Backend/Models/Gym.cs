using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    [Table("GYM")]
    public class Gym 
    {
        public Gym()
        {
            this.Pictures = new List<Picture>();
        }

        [Key()]
        [Column("GymID")]
        public int ID { get; set; }

        [Column("Naziv")]
        [MaxLength(50)]
        public string Naziv  { get; set; }

        [Column("RadnoVreme")]
        public string RadnoVreme { get; set; }

        [Column("KapacitetPoSatu")]
        [Required]
        public int KapacitetPoSatu { get; set; }
        
        [Column("WebSajt")]
        public string WebSajt { get; set; }

        [JsonIgnore]
        public virtual List<User> Klijenti { get; set; }

        [JsonIgnore]
        public virtual List<Termin> ZakazaniTermini { get; set; }

        [JsonIgnore]
        public virtual List<Picture> Pictures { get; set; }
    }
}