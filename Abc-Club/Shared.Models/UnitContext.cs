
using System.ComponentModel.DataAnnotations;

namespace Shared.Models
{
    public class UnitContext
    {
        [Key]
        public int Id { get; set; }
        public string Context { get; set; }
        public string UnitSolution { get; set; }
    }
}
