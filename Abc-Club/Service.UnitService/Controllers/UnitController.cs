using Businesslogic.Units;
using Businesslogic.Units.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
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

        [HttpGet(Name = "GetStatisics")]
        public async Task<List<UnitStatistic>> GetStatisics(int userId)
        {
            using(var repo = _unitRepository)
            {
                return await repo.GetStatistics(userId);
            }
        }

        [HttpGet("{requestModel}", Name = "RequestUnit")]
        public async Task<List<Unit>> RequestUnit(string requestModel)
        {
            var model = JsonConvert.DeserializeObject<UnitRequestModel>(requestModel);

            using (var repo = _unitRepository)
            {   
                var units = new List<Unit>();
                units.Add(await repo.GenerateUnit(model.UnitType, model.LevelType, model.UserId));

                return units;
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
