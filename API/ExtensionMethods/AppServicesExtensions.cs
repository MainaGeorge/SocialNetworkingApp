using API.Data;
using API.Interfaces;
using API.Profiles;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace API.ExtensionMethods
{
    public static class AppServicesExtensions
    {
        public static IServiceCollection AddAppServices(this IServiceCollection services, 
            IConfiguration config)
        {
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            services.AddScoped<ITokenService, TokenService>();
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            services.AddScoped<IUserRepository, UserRepository>();

            return services;
        }
    }
}