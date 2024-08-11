namespace src.Services
{
    public class Configuration
    {
        private readonly IConfiguration _configuration;

        public Configuration(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public string AzureOpenAiResourceUrl => _configuration["AzureOpenAi:ResourceUrl"];
        public string AzureOpenAiApiKey => _configuration["AzureOpenAi:ApiKey"];
        public string Testing => _configuration["AzureOpenAi:Testing"];
    }
}
