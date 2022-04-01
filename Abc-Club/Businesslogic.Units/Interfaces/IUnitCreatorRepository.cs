using Shared.Enums;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Businesslogic.Units.Interfaces
{
    public interface IUnitCreatorRepository: IDisposable
    {
        public Task<List<CustomUnit>> GetAll();
        public Task<List<CustomUnit>> GetUnits(UnitTypeEnum unitType, LevelTypeEnum level, int unitCount = 5);

        public Task CreateOrUpdateUnit(CustomUnit unit);
        
        public Task DeleteUnit(int id);
    }
}
