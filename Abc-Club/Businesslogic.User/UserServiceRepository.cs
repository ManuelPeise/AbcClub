using Businesslogic.User.Interfaces;
using Data.UserContext;
using Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Businesslogic.User
{
    public class UserServiceRepository : IUserServiceRepository
    {
        private bool disposedValue;
        private UserDataContext _userDataContext;

        public UserServiceRepository(UserDataContext userDataContext)
        {
            _userDataContext = userDataContext;
            _userDataContext = userDataContext;
        }

        public async Task<List<UserDataModel>> GetUsers()
        {
            try
            {
                var users = _userDataContext.UserData.Select(x => new UserDataModel
                {
                    Id = x.Id,
                    Name = x.Name,
                    Username = x.Username,
                    Firstname = x.Firstname,
                }).ToList();

                //if (!users.Any())
                //{
                //    throw new Exception("Could not get users from database!");
                //}

                return await Task.FromResult(users);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task AddUser(UserDataModel userData)
        {
            try
            {
                if (userData != null && !_userDataContext.UserData.Where(x => x.Id == userData.Id).Any())
                {
                    _userDataContext.UserData.Add(userData);

                    if (await _userDataContext.SaveChangesAsync() < 1)
                    {
                        throw new Exception("Could not save new user!");
                    }
                }

            }
            catch (Exception ex)
            {
                // TODO
            }
        }


        #region dispose
        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    _userDataContext.Dispose();
                }

                disposedValue = true;
            }
        }

        public void Dispose()
        {
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }

        #endregion
    }

}
