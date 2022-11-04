
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
        private const string ClientId = "6mkpk5eguge2r1mei08q0d5ur2";
        private const string ClientSecret = "16s99eq31eno4a8174r9vp9oemcms02egl3ha3ck794t6k0jk3em";
        private const string TokenURL = "https://auth.stage.tictoc.ai/oauth2/token";
        private const string ApiURL = "https://api.stage.tictoc.ai/product/v1.0/calculator/getloancomparison";
        private const string Scope = "api.stage.tictoc.ai/devtask";

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
            RestRequest tokenRequest = new RestRequest(TokenURL)
                .AddHeader("Content-Type", "application/x-www-form-urlencoded")
                .AddParameter("grant_type", "client_credentials")
                .AddParameter("scope", Scope)
                .AddParameter("client_id", ClientId)
                .AddParameter("client_secret", ClientSecret);

            // Request Token
            RestResponse tokenResponse = await httpClient.PostAsync(tokenRequest);

            // Deserialise token into Token object
            TokenObject token = JsonConvert.DeserializeObject<TokenObject>(tokenResponse.Content);

            // Construct API request adding auth and params
            RestRequest apiRequest = new RestRequest(ApiURL)
                .AddHeader("API", ApiURL)
                .AddHeader("Authorization", token.GetTokenString()) 
                .AddJsonBody(body);

            // Execute API request
            return await httpClient.PostAsync(apiRequest);
        }
    }
}
