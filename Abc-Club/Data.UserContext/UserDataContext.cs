using Microsoft.EntityFrameworkCore;
using Shared.Models;
using System;

namespace Data.UserContext
{
    public class UserDataContext: DbContext
    {
        public UserDataContext(DbContextOptions<UserDataContext> options) : base(options) { }

        public DbSet<UserDataModel> UserData { get; set; }

    }
}
