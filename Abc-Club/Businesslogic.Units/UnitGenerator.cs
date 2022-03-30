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

        public async Task<Unit> GenerateUnit(UnitTypeEnum unitType, LevelTypeEnum levelType, int userId, CalculationRuleEnum? calculationRule = null)
        {
            switch (unitType)
            {
                case UnitTypeEnum.NumberChaos:
                    return await GenerateNumberChaosUnit(levelType, userId);
                case UnitTypeEnum.Calculation:
                    return await GenerateCalculationUnit(levelType, (CalculationRuleEnum)calculationRule, userId);
                case UnitTypeEnum.AbcQuiz:
                    return await GenerateAbcQuizUnit(levelType, userId);
                default: throw new ArgumentNullException(nameof(unitType));
            }
        }

        #region alphabet quiz

        private async Task<Unit> GenerateAbcQuizUnit(LevelTypeEnum levelType, int userId)
        {
            var alphabet = new List<string> { "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" };
            return await Task.FromResult(new Unit
            {
                UserId = userId,
                Level = levelType,
                UnitType = UnitTypeEnum.AbcQuiz,
                UnitContext = new UnitContext
                {
                    Context = GetAlphabetContext(levelType, alphabet),
                    UnitSolution = JsonConvert.SerializeObject(alphabet)
                }
            });
        }

        private string GetAlphabetContext(LevelTypeEnum levelType, List<string> alphabet)
        {
            var countOfcharsToReplace = GetCharsToReplace(levelType);
            var matches = new List<int>();

            var generator = new Random();

            for(var i = 0; i < countOfcharsToReplace; i++)
            {
                var field = generator.Next(0, alphabet.Count - 1);

                if (!matches.Contains(field))
                {
                    alphabet[field] = String.Empty;

                    matches.Add(field);
                }
                else
                {
                    i--;
                }
            }

            return JsonConvert.SerializeObject(alphabet);
        }

        private int GetCharsToReplace(LevelTypeEnum levelType)
        {
            switch (levelType)
            {
                case LevelTypeEnum.Easy:
                    return new Random().Next(1, 4);
                case LevelTypeEnum.Medium:
                    return new Random().Next(3, 8);
                case LevelTypeEnum.Expert:
                    return new Random().Next(7, 16);
                default: throw new ArgumentOutOfRangeException(nameof(levelType));
            }
        }

        #endregion

        #region Calculation units

        private async Task<Unit> GenerateCalculationUnit(LevelTypeEnum levelType, CalculationRuleEnum calculationRule, int userId)
        {
            var maxResult = GetMaxResult(levelType);
            var unitCount = 5;
            var units = new List<CalculationUnit>();

            for (var i = 0; i < 5; i++)
            {
                units.Add(GenerateCalculationUnit(maxResult, calculationRule));
            }


            return await Task.FromResult(new Unit
            {
                UserId = userId,
                Level = levelType,
                UnitType = UnitTypeEnum.Calculation,
                UnitContext = new UnitContext
                {
                    Context = JsonConvert.SerializeObject(units),
                    UnitSolution = JsonConvert.SerializeObject(units),
                }
            });
        }

        private CalculationUnit GenerateCalculationUnit(int maxResult, CalculationRuleEnum calculationRule)
        {
            var number = new Random().Next(1, maxResult);
            var result = new Random().Next(number, maxResult);

            if (calculationRule == CalculationRuleEnum.Plus)
            {
                return GetPlusUnit(result, calculationRule);

            }
            else if (calculationRule == CalculationRuleEnum.Minus)
            {
                return GetMinusUnit(result, calculationRule);
            }
            else
            {
                var randomRule = (CalculationRuleEnum)new Random().Next(0, 1);

                switch (randomRule)
                {
                    case CalculationRuleEnum.Plus:
                        return GetPlusUnit(result, randomRule);
                    case CalculationRuleEnum.Minus:
                        return GetMinusUnit(result, randomRule);
                    default: throw new ArgumentOutOfRangeException(nameof(randomRule));
                }
            }

        }

        private CalculationUnit GetPlusUnit(int result, CalculationRuleEnum calculationRule)
        {
            var number = new Random().Next(1, result);

            return new CalculationUnit
            {
                NumberOne = number,
                NumberTwo = result - number,
                Result = result,
                CalculationRule = calculationRule

            };
        }

        private CalculationUnit GetMinusUnit(int number, CalculationRuleEnum calculationRule)
        {
            var numberTwo = new Random().Next(1, number);
            var result = number - numberTwo;

            return new CalculationUnit
            {
                NumberOne = number,
                NumberTwo = numberTwo,
                Result = result,
                CalculationRule = calculationRule
            };
        }

        private int GetMaxResult(LevelTypeEnum level)
        {
            switch (level)
            {
                case LevelTypeEnum.Easy:
                    return 10;
                case LevelTypeEnum.Medium:
                    return 30;
                case LevelTypeEnum.Expert:
                    return 100;
                default: throw new ArgumentNullException(nameof(level));

            }
        }

        #endregion

        #region NumberChaos
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

        private List<int> GetNumbers(int startNumber)
        {
            var random = new Random();
            var numbers = new List<int>();

            for (var i = startNumber; i < startNumber + 10; i++)
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
                    return new Random().Next(1, 10);
                case LevelTypeEnum.Medium:
                    return new Random().Next(1, 30);
                case LevelTypeEnum.Expert:
                    return new Random().Next(31, 91);
                default: return 1;
            }
        }
        #endregion
    }
}
