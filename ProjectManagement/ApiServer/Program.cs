using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication;
using System.Text;
using Microsoft.EntityFrameworkCore;
using ApiServer.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Diagnostics;
using ApiServer;
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Add DbContext with SQLite
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
// Add Identity
builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
{
    // This application is just for simple learning, therefore removing strict password requirements
    options.Password.RequireDigit = false;
    options.Password.RequiredLength = 1; // Allow short passwords
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireLowercase = false;
    options.Password.RequiredUniqueChars = 0;
})
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

 // This explicitly tells Identity to NOT use cookies and instead use JWT
builder.Services.Configure<IdentityOptions>(options =>
{
    options.SignIn.RequireConfirmedAccount = false;
});

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
builder.Logging.AddConsole();
/*builder.Services.AddAuthentication("Bearer")    
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "ApiServer",
            ValidAudience = "ApiServer",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("YourSec34244365gtrhtr4y65trjfgh7658765gfhfretKeyHere"))
        };
        // Log authentication errors
        options.Events = new JwtBearerEvents
        {
            OnAuthenticationFailed = context =>
            {
                Debug.WriteLine($"Token authentication failed: {context.Exception.Message}");
                return Task.CompletedTask;
            }
        };
    });
*/
// builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//     .AddJwtBearer(options =>
//     {
//         options.TokenValidationParameters = new TokenValidationParameters
//         {
//             ValidateIssuer = true,
//             ValidateAudience = true,
//             ValidateLifetime = true,
//             ValidateIssuerSigningKey = true,
//             ValidIssuer = "ApiServer",
//             ValidAudience = "ApiServer",
//             IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("YourSec34244365gtrhtr4y65trjfgh7658765gfhfretKeyHere"))
//         };

//         options.Events = new JwtBearerEvents
//         {
//             OnAuthenticationFailed = context =>
//             {
//                 context.Response.StatusCode = StatusCodes.Status401Unauthorized;
//                 context.Response.ContentType = "application/json";
//                 var errorResponse = new { error = "Invalid token", details = context.Exception.Message };
//                 Debug.WriteLine(JsonSerializer.Serialize(errorResponse));
//                 Console.WriteLine(JsonSerializer.Serialize(errorResponse));
//                 return context.Response.WriteAsJsonAsync(errorResponse);
//             },
//             OnTokenValidated = context =>
//             {
//                 Console.WriteLine($"Token validated for user: {context.Principal?.Identity?.Name}");
//                 Debug.WriteLine($"Token validated for user: {context.Principal?.Identity?.Name}");
//                 return Task.CompletedTask;
//             },
//             OnChallenge = context =>
//             {
//                 if (!context.Response.HasStarted)
//                 {
//                     context.Response.StatusCode = StatusCodes.Status401Unauthorized;
//                     context.Response.ContentType = "application/json";
//                     var errorResponse = new { error = "Unauthorized", details = "Token is missing or invalid." };
//                     Debug.WriteLine(JsonSerializer.Serialize(errorResponse));
//                     Console.WriteLine(JsonSerializer.Serialize(errorResponse));
//                     return context.Response.WriteAsJsonAsync(errorResponse);
//                 }
//                 return Task.CompletedTask;
//             },
//             OnForbidden = context =>
//             {
//                 context.Response.StatusCode = StatusCodes.Status403Forbidden;
//                 context.Response.ContentType = "application/json";
//                 var errorResponse = new { error = "Forbidden", details = "You do not have access to this resource." };
//                 Debug.WriteLine(JsonSerializer.Serialize(errorResponse));
//                 Console.WriteLine(JsonSerializer.Serialize(errorResponse));
//                 return context.Response.WriteAsJsonAsync(errorResponse);
//             }

//         };
//         options.IncludeErrorDetails = true;
        
//     });
// builder.Services.AddAuthorization(); // Add authorization middleware
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme; // 👈 Set everything to JWT
})
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "ApiServer",
            ValidAudience = "ApiServer",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("YourSec34244365gtrhtr4y65trjfgh7658765gfhfretKeyHere"))
        };

        options.Events = new JwtBearerEvents
        {
            OnAuthenticationFailed = context =>
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                context.Response.ContentType = "application/json";
                var errorResponse = new { error = "Invalid token", details = context.Exception.Message };
                Debug.WriteLine(JsonSerializer.Serialize(errorResponse));
                Console.WriteLine(JsonSerializer.Serialize(errorResponse));
                return context.Response.WriteAsJsonAsync(errorResponse);
            },
            OnTokenValidated = context =>
            {
                Console.WriteLine($"Token validated for user: {context.Principal?.Identity?.Name}");
                Debug.WriteLine($"Token validated for user: {context.Principal?.Identity?.Name}");
                return Task.CompletedTask;
            },
            OnChallenge = context =>
            {
                if (!context.Response.HasStarted)
                {
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    context.Response.ContentType = "application/json";
                    var errorResponse = new { error = "Unauthorized", details = "Token is missing or invalid." };
                    Debug.WriteLine(JsonSerializer.Serialize(errorResponse));
                    Console.WriteLine(JsonSerializer.Serialize(errorResponse));
                    return context.Response.WriteAsJsonAsync(errorResponse);
                }
                return Task.CompletedTask;
            },
            OnForbidden = context =>
            {
                context.Response.StatusCode = StatusCodes.Status403Forbidden;
                context.Response.ContentType = "application/json";
                var errorResponse = new { error = "Forbidden", details = "You do not have access to this resource." };
                Debug.WriteLine(JsonSerializer.Serialize(errorResponse));
                Console.WriteLine(JsonSerializer.Serialize(errorResponse));
                return context.Response.WriteAsJsonAsync(errorResponse);
            }
        };
        options.IncludeErrorDetails = true;
    });

builder.Services.AddAuthorization();

builder.Services.AddControllers();
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.ExpireTimeSpan = TimeSpan.FromMinutes(60);

    // Disable automatic redirects for unauthorized access
    options.LoginPath = "/api/auth/login";
    options.AccessDeniedPath = "/api/auth/accessdenied";
    options.SlidingExpiration = true;
});
var app = builder.Build();
// Ensure the database is created
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<ApplicationDbContext>();
    context.Database.EnsureCreated();
}
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseMiddleware<ExceptionMiddleware>();
app.UseHttpsRedirection();
app.UseRouting();



app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var userManager = services.GetRequiredService<UserManager<IdentityUser>>();
    var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();

    var adminRole = "Admin";
    if (!await roleManager.RoleExistsAsync(adminRole))
    {
        await roleManager.CreateAsync(new IdentityRole(adminRole));
    }

    var adminUser = new IdentityUser { UserName = "admin", Email = "admin@example.com" };
    if (await userManager.FindByNameAsync(adminUser.UserName) == null)
    {
        await userManager.CreateAsync(adminUser, "Admin@123");
        await userManager.AddToRoleAsync(adminUser, adminRole);
    }
}
app.Run();

