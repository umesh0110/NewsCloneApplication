namespace NewsApp.MVC.Models
{
    public class InternalModels
    {
    }

    public class APIRequest
    {
        public string ApiMode { get; set; }
        public string ResultsType { get; set; }
        public string SearchString { get; set; }
        public string Lang { get; set; }
        public string ArticleType { get; set; }

    }

    public class APIRoutes : Dictionary<string, string>
    {

    }

    public class Applicationconfig
    {
        public string NewsAPIUrl { get; set; }
        public string APIToken { get; set; }
    }


}
