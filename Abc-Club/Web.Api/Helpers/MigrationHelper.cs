using Data.AppData;
using Data.UserContext;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Linq;

namespace Web.Api.Helpers
{
    public static class MigrationHelper
    {
        internal static void TryMigrateDatabases(IApplicationBuilder app)
        {
            var serviceProvider = app.ApplicationServices;
            
            Migrate<UserDataContext>(serviceProvider);

            Migrate<AppDataContext>(serviceProvider); 
        }

        private static void Migrate<T>(IServiceProvider provider)
        {

            if (typeof(T) == typeof(UserDataContext))
            {
                using (var scope = provider.CreateScope())
                {
                    var context = scope.ServiceProvider.GetRequiredService<UserDataContext>();

                    var created = context.Database.EnsureCreated();

                    if (context.Database.GetPendingMigrations().Any())
                    {
                        context.Database.Migrate();
                    }
                }
            }

            if (typeof(T) == typeof(AppDataContext))
            {
                using (var scope = provider.CreateScope())
                {
                    var context = scope.ServiceProvider.GetRequiredService<AppDataContext>();

                    var created = context.Database.EnsureCreated();

                    if (context.Database.GetPendingMigrations().Any())
                    {
                        context.Database.Migrate();
                    }
                }
            }
        }
    }
}
