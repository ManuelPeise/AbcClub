using Businesslogic.User.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.UserService.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class UserController: ControllerBase
    {
        private IUserServiceRepository _userServiceRepo;

        public UserController(IUserServiceRepository userServiceRepo)
        {
            _userServiceRepo = userServiceRepo;
        }

        [HttpGet(Name = "GetUsers")]
        public async Task<List<UserDataModel>> GetUsers()
        {
            using (var repo = _userServiceRepo)
            {
                return await repo.GetUsers();
            }
        }

        [HttpPost(Name = "AddUser")]
        public async Task AddUser([FromBody] UserDataModel userData)
        {
            using (var repo = _userServiceRepo)
            {
                await repo.AddUser(userData);
            }
        }
    }
}
