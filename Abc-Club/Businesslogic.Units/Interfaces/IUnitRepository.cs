using Shared.Enums;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Businesslogic.Units.Interfaces
{
    public interface IUnitRepository: IDisposable
    {
        Task SaveUnitResult(UnitResult result);

        Task<List<UnitResult>> GetAllUnitResults(UnitTypeEnum unitType, LevelTypeEnum? levelType, int? userId);

        Task<Unit> GenerateUnit(UnitTypeEnum unitType, LevelTypeEnum levelType, int userId);
    }
}
