using Shared.Enums;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Businesslogic.Units.Interfaces
{
    public interface IUnitCreatorRepository: IDisposable
    {
        public Task CreateOrUpdateUnit(CustomUnit unit);
        public Task<List<CustomUnit>> GetUnits(UnitTypeEnum unitType, LevelTypeEnum level, int unitCount = 5);
        public Task DeleteUnit(int id);
    }
}
