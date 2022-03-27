using Microsoft.EntityFrameworkCore;
using Shared.Models;

namespace Data.AppData
{
    public class AppDataContext: DbContext
    {
        public AppDataContext(DbContextOptions<AppDataContext> options): base(options) {}

        public DbSet<UnitResult> UnitResults { get; set; }
    }
}
