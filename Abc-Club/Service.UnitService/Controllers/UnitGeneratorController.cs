using Businesslogic.Units.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Shared.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Service.UnitService.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class UnitGeneratorController: ControllerBase
    {
        private IUnitCreatorRepository _unitCreatorRepository;

        public UnitGeneratorController(IUnitCreatorRepository unitCreatorRepository)
        {
            _unitCreatorRepository = unitCreatorRepository;
        }

        [HttpGet(Name = "GetUnits")]
        public async Task<List<CustomUnit>> GetUnits()
        {
            using(var repo = _unitCreatorRepository)
            {
                return await repo.GetAll();
            }
        }

        [HttpPost(Name = "AddOrUpdateUnit")]
        public async Task AddOrUpdateUnit([FromBody] CustomUnit unit)
        {
            using (var repo = _unitCreatorRepository)
            {
                await repo.CreateOrUpdateUnit(unit);
            }
        }

        [HttpDelete(Name = "DeleteUnit")]
        public async Task DeleteUnit(int id)
        {
            using (var repo = _unitCreatorRepository)
            {
                await repo.DeleteUnit(id);
            }
        }
    }
}
