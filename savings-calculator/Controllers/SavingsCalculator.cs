
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RestSharp;
using Newtonsoft.Json;

namespace savings_calculator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SavingsCalculatorController : ControllerBase
    {
        // Create new environment object
        Environment Env = new Environment();

        [HttpGet]
        public async Task<RestResponse> Get([FromQuery] QueryParameters parameters) // Binding validation for params
        {
            // Extract params
            float rate = parameters.CustomerRate;
            int amount = parameters.BorrowingAmount;

            // Construct payload with params
            PostPayload body = new(rate, amount);

            // Create Rest Client
            RestClient httpClient = new();

            // Construct Bearer Token Request
            RestRequest tokenRequest = new RestRequest(Env.GetTokenURL())
                .AddHeader("Content-Type", "application/x-www-form-urlencoded")
                .AddParameter("grant_type", "client_credentials")
                .AddParameter("scope", Env.GetScope())
                .AddParameter("client_id", Env.GetClientId())
                .AddParameter("client_secret", Env.GetClientSecret());

            // Request Token
            RestResponse tokenResponse = await httpClient.PostAsync(tokenRequest);

            // Deserialise token into Token object
            TokenObject token = JsonConvert.DeserializeObject<TokenObject>(tokenResponse.Content);

            // Construct API request adding auth and params
            RestRequest apiRequest = new RestRequest(Env.GetApiURL())
                .AddHeader("API", Env.GetApiURL())
                .AddHeader("Authorization", token.GetTokenString()) 
                .AddJsonBody(body);

            // Execute API request
            return await httpClient.PostAsync(apiRequest);
        }
    }
}
