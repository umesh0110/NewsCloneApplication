using AspNetCoreRateLimit;
using Microsoft.AspNetCore.Builder;
using NewsApp.MVC.Helper;
using NewsApp.MVC.Models;
using System.Net.Security;
using System.Security.Authentication;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddScoped(typeof(IAPIConsumer), typeof(APIConsumer));


builder.Services.Configure<APIRoutes>(builder.Configuration.GetSection("APIRoutes"));
builder.Services.Configure<Applicationconfig>(builder.Configuration.GetSection("Applicationconfig"));

builder.Services.AddAntiforgery((options) =>
{
    options.Cookie.Name = "NEWS-APP-XSRF-COOKIE";
    options.FormFieldName = "NEWS-APP-XSRF-FORM";
    options.HeaderName = "NEWS-APP-XSRF-HEADER";
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;

});


builder.Services.Configure<IpRateLimitOptions>(builder.Configuration.GetSection("IpRateLimiting"));
builder.Services.AddSingleton<IIpPolicyStore, MemoryCacheIpPolicyStore>();
builder.Services.AddSingleton<IRateLimitCounterStore, MemoryCacheRateLimitCounterStore>();
builder.Services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();
builder.Services.AddSingleton<IProcessingStrategy, AsyncKeyLockProcessingStrategy>();
builder.Services.AddInMemoryRateLimiting();

builder.Services.AddHttpClient("NewsAPIClient", client =>
{
    client.BaseAddress = new Uri(builder.Configuration["Applicationconfig:NewsAPIUrl"]);

}).ConfigurePrimaryHttpMessageHandler(() =>
{
    var sslOptions = new SslClientAuthenticationOptions
    {
        RemoteCertificateValidationCallback = delegate { return true; },
        EnabledSslProtocols = SslProtocols.Tls12 | SslProtocols.Tls11 | SslProtocols.Tls
    };
    return new SocketsHttpHandler() { SslOptions = sslOptions, UseCookies = false  };
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    //app.UseHsts();
}
app.UseHsts();
app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseCors(builder => { builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader(); });
//app.UseAuthorization();

var origins = builder.Configuration["AcceptedOrigins"]?.Split(";");
if (origins != null && origins.Length>0)
{
    app.UseCors(item => item
            .WithOrigins(origins));
}


app.Use(async (context, next) =>
{
    //context.Response.Headers.Add("Strict-Transport-Security", "max-age=31536000");
    context.Response.Headers.Add("X-Content-Type-Options", "nosniff");
    //context.Response.Headers.Add("X-Xss-Protection", "1; mode=block");
    context.Response.Headers.Add("X-Frame-Options", "SAMEORIGIN");
    context.Response.Headers.Add("Referrer-Policy", "strict-origin-when-cross-origin");
    // context.Response.Headers.Add("Content-Security-Policy", "object-src 'self'; img-src 'self'; default-src 'self';");
    //context.Response.Headers.Add("Content-Security-Policy", "default-src https:;");
    await next();
});


app.MapControllerRoute(
    name: "default",
    pattern: "{controller=News}/{action=Index}/{id?}");

app.UseIpRateLimiting();

app.Run();
