using System.Linq;
using API.Dtos;
using API.Entities;
using API.ExtensionMethods;
using AutoMapper;


namespace API.Profiles
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<AppUser, AppUserDto>()
                .ForMember(m => m.Age,
                    opts => 
                        opts.MapFrom(d => d.DateOfBirth.CalculateAge()))
                .ForMember(m => m.PhotoUrl, opt => 
                    opt.MapFrom(s => s.Photos.FirstOrDefault(p => p.IsMain).Url));

            CreateMap<Photo, PhotoDto>();
        }
    }
}