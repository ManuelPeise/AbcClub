using Shared.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Businesslogic.User.Interfaces
{
    public interface IUserServiceRepository : IDisposable
    {
        Task<List<UserDataModel>> GetUsers();
        Task AddUser(UserDataModel userData);
    }
}
