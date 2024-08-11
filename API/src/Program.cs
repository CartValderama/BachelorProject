using Microsoft.EntityFrameworkCore;
using Serilog;
using Serilog.Events;
using src.DAL;
using src.Models;
using src.Services;
using src.Services.AzureServices;

namespace src;

public class Program
{
    public static void Main(string[] args)
    {

        var builder = WebApplication.CreateBuilder(args);

        string reactBaseUrl = "";

        // Add services to the container.
        builder.Services.AddControllers();

        // configure the database context based on the environment
        if (builder.Environment.IsDevelopment()) // local
        {
            reactBaseUrl = builder.Configuration["ClientApp:LocalBaseUrl"];
            
            builder.Services.AddDbContext<AiceeDbContext>(options =>
                options.UseSqlServer(
                    builder.Configuration.GetConnectionString("LocalConnection"))); // Data Source=AiceeDatabase.db
            
        }
        else // "prod"
        {
            reactBaseUrl = builder.Configuration["ClientApp:WebsiteBaseUrl"];

            builder.Services.AddDbContext<AiceeDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
        }
        Console.WriteLine($"\nThis is the current react url: {reactBaseUrl}\n");

        builder.Services.AddScoped<IFolderRepository, FolderRepository>();
        builder.Services.AddScoped<IDeckRepository, DeckRepository>();
        builder.Services.AddScoped<IFlashcardRepository, FlashcardRepository>();
        builder.Services.AddScoped<IChatRequestRepository, ChatRequestRepository>();
        builder.Services.AddScoped<IChatResponseRepository, ChatResponseRepository>();
        builder.Services.AddScoped<IFeedbackRepository, FeedbackRepository>();
        builder.Services.AddScoped<IAiDistractorsSetRepository, AiDistractorsSetRepository>();
        builder.Services.AddScoped<IAiDeckDetailRepository, AiDeckDetailRepository>();

        builder.Services.AddScoped<AzureOpenaiService>();
        builder.Services.AddScoped <ChatRequestBuilder>();
        builder.Services.AddScoped<EntityModelConverter>();


        var loggerConfiguration = new LoggerConfiguration()
            .MinimumLevel.Information() // levels: Trace< Information < Warning < Erorr < Fatal
            .WriteTo.File($"Logs/app_{DateTime.Now:yyyyMMdd_HHmmss}.log");

        loggerConfiguration.Filter.ByExcluding(e => e.Properties.TryGetValue("SourceContext", out var value) &&
                                    e.Level == LogEventLevel.Information &&
                                    e.MessageTemplate.Text.Contains("Executed DbCommand"));

        var logger = loggerConfiguration.CreateLogger();
        builder.Logging.AddSerilog(logger);

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        builder.Services.AddSingleton<Configuration>();

        builder.Services.AddCors(options =>
        {
            options.AddPolicy("CorsPolicy",
                policyBuilder => policyBuilder
                    .WithOrigins(reactBaseUrl) // Ensure this is the correct URL
                    .AllowAnyMethod()
                    .AllowAnyHeader()
            );
        });

        var app = builder.Build();

        // Swagger only enabled locally
        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
            
        }        

        app.UseCors("CorsPolicy");


        app.UseHttpsRedirection();


        app.MapControllers();

        app.Run();
    }
}
