using Shared.Enums;

namespace Shared.Models
{
    public class UnitBase
    {
        public int UserId { get; set; }
        public UnitTypeEnum UnitType { get; set; }
        public LevelTypeEnum Level { get; set; }
    }
}
