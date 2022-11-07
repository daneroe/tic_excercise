
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RestSharp;
using Newtonsoft.Json;
using System;

namespace savings_calculator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SavingsCalculatorController : ControllerBase
    {
      
        // Create Rest Client
        private RestClient httpClient = new();

        // Create new environment object
        private Environment Env = new Environment();

        // Async function for token retrieval - Can probably just access the httpClient directly in the function as it's all class properties 
        private async Task<string> GetToken(RestClient httpClient) {
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
            return token.GetTokenString();
        }

        [HttpGet]
        public async Task<RestResponse> Get([FromQuery] QueryParameters parameters) // Binding validation for params
        {
            // Extract params
            float rate = parameters.CustomerRate;
            int amount = parameters.BorrowingAmount;

            // Construct payload with params
            PostPayload body = new(rate, amount);

            // Construct API request adding auth and params
            RestRequest apiRequest = new RestRequest(Env.GetApiURL())
                .AddHeader("API", Env.GetApiURL())
                .AddHeader("Authorization", await GetToken(httpClient))
                .AddJsonBody(body);

            // Execute API request
            return await httpClient.PostAsync(apiRequest);
        }
    }
}
