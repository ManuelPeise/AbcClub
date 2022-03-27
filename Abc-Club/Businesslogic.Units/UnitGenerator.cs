using Newtonsoft.Json;
using Shared.Enums;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Businesslogic.Units
{
    public class UnitGenerator
    {
        public UnitGenerator()
        {

        }

        public async Task<Unit> GenerateUnit(UnitTypeEnum unitType, LevelTypeEnum levelType, int userId)
        {
            switch (unitType)
            {
                case UnitTypeEnum.NumberChaos:
                    return await GenerateNumberChaosUnit(levelType, userId);
                default: throw new ArgumentNullException(nameof(unitType));
            }
        }

        private async Task<Unit> GenerateNumberChaosUnit(LevelTypeEnum level, int userId)
        {
            var startNumber = GetStartNumber(level);

            var numbers = GetNumbers(startNumber);
            var generator = new Random();

            var shuffeledNumbers = numbers.OrderBy(x => generator.Next()).ToList();

            return await Task.FromResult(new Unit
            {
                UserId = userId,
                Level = level,
                UnitType = UnitTypeEnum.NumberChaos,
                UnitContext = new UnitContext
                {
                    Context = JsonConvert.SerializeObject(shuffeledNumbers),
                    UnitSolution = JsonConvert.SerializeObject(numbers)
                }
            });
        }

   

        private List<int> GetShuffeledNumbers(List<int> numbers)
        {
            var shuffeledNumbers = new List<int>();
            var generator = new Random();

            while (numbers.Count > 0)
            {
                var positionToRemove = generator.Next(numbers.Count);
                shuffeledNumbers.Add(numbers[positionToRemove]);

                numbers.Remove(positionToRemove);
            }

            return shuffeledNumbers;
        }

        private List<int> GetNumbers(int startNumber)
        {
            var random = new Random();
            var numbers = new List<int>();

            for(var i = startNumber; i < startNumber + 10; i++)
            {
                numbers.Add(i);
            }

            return numbers;
        }

        private int GetStartNumber(LevelTypeEnum level)
        {
            switch (level)
            {
                case LevelTypeEnum.Easy:
                    return 1;
                case LevelTypeEnum.Medium:
                    return 11;
                case LevelTypeEnum.Expert:
                    return new Random().Next(21, 91);
                default: return 1;
            }
        }
    }
}
