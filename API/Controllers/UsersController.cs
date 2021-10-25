using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Dtos;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Authorize]
    [Route("/api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepo;

        public UsersController(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUserDto>>> GetUsers()
        {
            var users = await _userRepo.GetMembers();
            return Ok(users);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<AppUser>> GetUser(string username)
        {
            var user = await _userRepo.GetMemberByUsername(username);
            if (user is not null) return Ok(user);

            return NotFound();
        }
    }
}