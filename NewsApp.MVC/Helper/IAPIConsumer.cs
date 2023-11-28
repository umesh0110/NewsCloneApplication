using NewsApp.MVC.Models;

namespace NewsApp.MVC.Helper
{
    public interface IAPIConsumer
    {
        dynamic GetResponse(APIRequest apiRequest);
    }
}
