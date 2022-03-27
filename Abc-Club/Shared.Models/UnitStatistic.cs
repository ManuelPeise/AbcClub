using Shared.Enums;

namespace Shared.Models
{
    public class UnitStatistic
    {
        public UnitTypeEnum UnitType { get; set; }
        public decimal PercentValue { get; set; }
        public int AllQuestions { get; set; }
    }
}
