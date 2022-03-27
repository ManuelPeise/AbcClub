using Businesslogic.Units;
using Businesslogic.Units.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Shared.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.UnitService.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class UnitController: ControllerBase
    {
        private readonly UnitGenerator _unitGenerator;
        private readonly IUnitRepository _unitRepository;

        public UnitController(UnitGenerator unitGenerator, IUnitRepository unitRepository) 
        {
            _unitGenerator = unitGenerator;
            _unitRepository = unitRepository;
        }

        [HttpGet(Name = "GetUnit")]
        public async Task<Unit> GetUnit()
        {
            using(var repo = _unitRepository)
            {
                return await repo.GenerateUnit(Shared.Enums.UnitTypeEnum.NumberChaos, Shared.Enums.LevelTypeEnum.Easy, 1);
            }
        }

        [HttpGet(Name = "GetStatisics")]
        public async Task<List<UnitStatistic>> GetStatisics(int userId)
        {
            using(var repo = _unitRepository)
            {
                return await repo.GetStatistics(userId);
            }
        }


        [HttpPost(Name = "SaveUnitResult")]
        public async Task SaveUnitResult([FromBody] UnitResult result)
        {
            using (var repo = _unitRepository)
            {
                await repo.SaveUnitResult(result);
            }
        }
    }
}
