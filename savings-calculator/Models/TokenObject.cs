using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace savings_calculator
{
    public class TokenObject
    {

        public TokenObject(string token, int expiry, string type)
        {
            access_token = token;
            expires_in = expiry;
            token_type = type;
        }

        public string access_token { get; set; }
        public int expires_in { get; set; }
        public string token_type { get; set; }

        public string GetTokenString()
        {
            return $"{this.token_type} {this.access_token}";
        }

    }
}
