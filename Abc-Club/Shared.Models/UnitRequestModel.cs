using Shared.Enums;

namespace Shared.Models
{
    public class UnitRequestModel
    {
        public int UserId { get; set; }
        public UnitTypeEnum UnitType { get; set; }
        public LevelTypeEnum LevelType { get; set; }
        public CalculationRuleEnum? CalculationRule { get; set; }
    }
}
