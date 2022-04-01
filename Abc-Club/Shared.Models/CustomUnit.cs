using Shared.Enums;
using System.ComponentModel.DataAnnotations;

namespace Shared.Models
{
    public class CustomUnit
    {
        [Key]
        public int Id { get; set; }
        public UnitTypeEnum UnitType { get; set; }
        public LevelTypeEnum Level { get; set; }
        public UnitContext UnitContext { get; set; }

    }
}
