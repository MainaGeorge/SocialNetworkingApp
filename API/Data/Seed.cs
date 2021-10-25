using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace API.Data
{
    public static class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (await context.Users.AnyAsync()) return;

            var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

            Console.WriteLine(users?.Count);

            if (users is not null)
            {
                foreach (var user in users)
                {
                    var hmac = new HMACSHA512();

                    user.UserName = user.UserName.ToLower();
                    user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("pa$$w0rd"));
                    user.PasswordSalt = hmac.Key;

                    context.Users.Add(user);
                }

                await context.SaveChangesAsync();
            }
        }
    }
}
