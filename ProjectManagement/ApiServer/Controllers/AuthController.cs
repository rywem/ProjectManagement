using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ApiServer.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly string jwtKey = "YourSec34244365gtrhtr4y65trjfgh7658765gfhfretKeyHere"; // Replace with a strong key

        public AuthController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserDto user)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { message = "Invalid input" });

            var identityUser = new IdentityUser
            {
                UserName = user.Username,
                Email = $"{user.Username}@{user.Username}.com"// Assuming email is the username
            };

            var result = await _userManager.CreateAsync(identityUser, user.Password);
            if (!result.Succeeded)
            {
                return BadRequest(new
                {
                    message = "User registration failed",
                    errors = result.Errors.Select(e => e.Description)
                });
            }

            return Ok(new { message = "User registered successfully" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserDto user)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { message = "Invalid input" });

            var identityUser = await _userManager.FindByNameAsync(user.Username);
            if (identityUser == null)
                return Unauthorized(new { message = "Invalid username or password" });

            var result = await _signInManager.PasswordSignInAsync(user.Username, user.Password, false, false);
            if (!result.Succeeded)
                return Unauthorized(new { message = "Invalid username or password" });

            var token = GenerateJwtToken(identityUser);
            return Ok(new { token });
        }

        private string GenerateJwtToken(IdentityUser user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: "ApiServer",
                audience: "ApiServer",
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    public class UserDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}