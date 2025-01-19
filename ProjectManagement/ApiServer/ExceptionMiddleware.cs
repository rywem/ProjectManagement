using System.Diagnostics;
using System.Net;
using System.Text.Json;
namespace ApiServer
{
 

    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                Console.WriteLine("invoked context");
                Debug.WriteLine("invoked context");
                await _next(context);
            }
            catch (Exception ex)
            {
                
                Debug.WriteLine($"Error: {ex.ToString()}");
                Console.WriteLine($"Error: {ex.ToString()}");
                _logger.LogError($"Unhandled Exception: {ex.Message}");

                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            //context.Response.ContentType = "application/json";
            //context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var response = new
            {
                error = "Internal Server Error",
                message = ex.Message,
                stackTrace = ex.StackTrace
            };
            var responseString = JsonSerializer.Serialize(response);
            Debug.WriteLine($"Error: {responseString}");
            Console.WriteLine($"Error: {responseString}");
            await context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
    }
}
