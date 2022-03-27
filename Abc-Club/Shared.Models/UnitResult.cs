using Shared.Enums;
using System.ComponentModel.DataAnnotations;

namespace Shared.Models
{
    public class UnitResult
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public UnitTypeEnum UnitType { get; set; }
        public LevelTypeEnum Level { get; set; }
        public int QuestionCount { get; set; }
        public int Points { get; set; }
        
    }
}
