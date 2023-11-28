using Microsoft.Extensions.Options;
using NewsApp.MVC.Models;

namespace NewsApp.MVC.Helper
{
    
    public class APIConsumer:IAPIConsumer
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly Applicationconfig _applicationconfig;
        private readonly APIRoutes _routes;
        public APIConsumer(IHttpClientFactory httpClientFactory, IOptions<Applicationconfig> applicationConfig, 
            IOptions<APIRoutes> apiRoutes, IHttpContextFactory contextFactory)
        {
            _httpClientFactory = httpClientFactory;
            _applicationconfig = applicationConfig.Value;
            _routes = apiRoutes.Value;
        }
        public dynamic GetResponse(APIRequest apiRequest)
        {
            dynamic itemsResponse = null;
            try
            {
                string appendRoute = _routes.ContainsKey(apiRequest.ResultsType.ToLower()) ? _routes[apiRequest.ResultsType.ToLower()] : string.Empty;
                // add exception

                if (apiRequest.ResultsType.Equals("search", StringComparison.InvariantCultureIgnoreCase))
                    appendRoute += "\"" + apiRequest.SearchString?.ToLower() + "\"";

                HttpClient httpClient = _httpClientFactory.CreateClient("NewsAPIClient");
                Uri uri = new Uri(_applicationconfig.NewsAPIUrl + appendRoute + "&lang=" + apiRequest.Lang);

                //if (apiRequest.ResultsType.Equals("recent", StringComparison.InvariantCultureIgnoreCase))
                //    uri = new Uri(appendRoute);


                HttpRequestMessage httpRequestMessage = new HttpRequestMessage(new HttpMethod("GET"), uri);
                //httpRequestMessage.Headers.Add("Content-Type", "application/json");

                var response = httpClient.SendAsync(httpRequestMessage).Result;
                string result = response.Content.ReadAsStringAsync().Result;
                itemsResponse = System.Text.Json.JsonSerializer.Deserialize<dynamic>(result);

            }
            catch (Exception)
            {

            }

            return itemsResponse;
        }
    }
}
