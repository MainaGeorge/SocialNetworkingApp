using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Dtos;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<AppUser> GetUserByIdAsync(int id) => await _context.Users
            .Include(u => u.Photos)
            .SingleOrDefaultAsync(u => u.Id.Equals(id));
        

        public  async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                .Include(u => u.Photos)
                .SingleOrDefaultAsync(u => u.UserName == username.ToLower());
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<AppUserDto> GetMemberByUsername(string username)
        {
            return await _context.Users
                .ProjectTo<AppUserDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(u => u.Username == username.ToLower());
        }

        public async Task<IEnumerable<AppUserDto>> GetMembers()
        {
            return await _context.Users
                .ProjectTo<AppUserDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }


        public void Update(AppUser appUser)
        {
            _context.Entry(appUser).State = EntityState.Modified;
        }
    }
}