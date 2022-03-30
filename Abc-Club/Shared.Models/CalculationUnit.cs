using Shared.Enums;

namespace Shared.Models
{
    public class CalculationUnit
    {
        public int NumberOne { get; set; }
        public int NumberTwo { get; set; }
        public CalculationRuleEnum CalculationRule { get; set; }
        public int Result { get; set; }
    }
}
