using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace savings_calculator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SavingsCalculatorController : ControllerBase
    {
        // retrieve 2 params

        private static JsonResult ConstructPost (double rate, int borrowAmount) {
            return new JsonResult(new PostPayload(rate, borrowAmount));
        }

        [HttpGet]
        public JsonResult get() {

            // make new post request here --  Feed in params
            return ConstructPost(4.0, 7);
        }

        // public IEnumerable<WeatherForecast> Get()
        // {
        //     var rng = new Random();
        //     return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        //     {
        //         Date = DateTime.Now.AddDays(index),
        //         TemperatureC = rng.Next(-20, 55),
        //         Summary = Summaries[rng.Next(Summaries.Length)]
        //     })
        //     .ToArray();
        // }
    }
}
