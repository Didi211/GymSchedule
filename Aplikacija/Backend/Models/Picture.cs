using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http;

namespace Backend.Models
{
    [Table("PICTURE")]
    public class Picture
    {
        /*Nacin imenovanja slike u bazi:
        za teretane: 'gymNaziv-ID-nesto.png' 'gymNaziv-ID-nesto'
        za profilne slike: 'profile-ID.png*/

        public Picture(IFormFile image)
        {
            this.ImageFile = image;
        }
        public Picture() { }

        [Key()]
        [Column("PictureID")]
        public int ID { get; set; }

        [Column("ImageName")]
        public string ImageName { get; set; }    

        [NotMapped]
        public string ImageSrc { get; set; }

        [NotMapped]
        public IFormFile ImageFile { get; set; }

        // [Column("UserID")]
        // public int? UserID { get; set; }

        // [JsonIgnore]
        // public virtual User user { get; set; }

        [Column("GymID")]
        public int? GymID { get; set; }

        [JsonIgnore]
        public virtual Gym Gym { get; set; }
    }
}