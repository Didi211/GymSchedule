using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("QUOTE")]
    public class Quote
    {
        [Key()]
        [Column("QuoteID")]
        public int ID { get; set; }
        
        [Column("Content")]
        [Required()]
        public string Content { get; set; }

        [Column("Author")]
        public string Author { get; set; }
    }
}