using Microsoft.AspNetCore.Mvc;
using NewsApp.MVC.Helper;
using NewsApp.MVC.Models;
using System.Text.RegularExpressions;

namespace NewsApp.MVC.Controllers
{
    [ValidateAntiForgeryToken]
    public class NewsController : Controller
    {
        private readonly IAPIConsumer _apiConsumer;
        public NewsController(IAPIConsumer apiConsumer)
        {
            _apiConsumer = apiConsumer;
        }
        [IgnoreAntiforgeryToken]
        public IActionResult Index()
        {
            return View();
        }
        
        [HttpGet]
        public ActionResult newsList([FromQuery] string language)
        {
            try
            {
                return Ok(_apiConsumer.GetResponse(new APIRequest { ResultsType = "GetList", Lang = language }));
                

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        [HttpGet]
        public ActionResult categoryNewsList([FromQuery] string category, [FromQuery] string language)
        {
            try
            {
                //category = "sports";
                return Ok(_apiConsumer.GetResponse(new APIRequest { ResultsType = category, Lang = language }));


            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        [HttpGet]
        public ActionResult searchResults([FromQuery] string searchString, [FromQuery] string language)
        {
            try
            {
                if(!Regex.IsMatch(searchString, @"^[a-zA-Z0-9 ]{1,40}$"))
                    return StatusCode(400, $"Invalid Input in Request");

                return Ok(_apiConsumer.GetResponse(new APIRequest { ResultsType = "search", SearchString = searchString, Lang = language }));


            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

       

    }
}
