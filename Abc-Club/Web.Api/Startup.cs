using Businesslogic.Units;
using Businesslogic.Units.Interfaces;
using Businesslogic.User;
using Businesslogic.User.Interfaces;
using Data.AppData;
using Data.UserContext;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Web.Api.Helpers;

namespace Web.Api
{
    public class Startup
    {
        private string _policy = "abcClubPolicy";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<UserDataContext>(opt =>
            {
                opt.UseMySQL(Configuration.GetConnectionString("userContext"));
            });

            services.AddDbContext<AppDataContext>(opt =>
            {
                opt.UseMySQL(Configuration.GetConnectionString("appDataContext"));
            });

            services.AddScoped<IUserServiceRepository, UserServiceRepository>();
            services.AddScoped<UnitGenerator>();
            services.AddScoped<IUnitRepository, UnitRepository>();
            services.AddScoped<IUnitCreatorRepository, UnitCreatorRepository>();

            services.AddCors(opt => {
                    opt.AddPolicy(_policy, x =>
                    {
                        x.AllowAnyMethod();
                        x.AllowAnyHeader();
                        x.AllowAnyOrigin();
                    });
                }
            );
            services.AddControllers();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Web.Api", Version = "v1" });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Web.Api v1"));

            app.UseHttpsRedirection();

            app.UseCors(_policy);

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            MigrationHelper.TryMigrateDatabases(app);
        }
    }
}
