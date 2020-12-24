using Api.Helpers;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;

namespace Api
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            HttpConfiguration config = GlobalConfiguration.Configuration;

            config.Formatters.JsonFormatter
                        .SerializerSettings
                        .ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;

        }
        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            //throw new HttpException(404, "Bad request");
       
            if (!string.IsNullOrEmpty(Request.Headers["Authorization"]) )//&& !(Request.Path.Contains("Login") || Request.Path.Contains("Sgnup")))
            {
                string token = Request.Headers["Authorization"].ToString();
                var validtoken = TokenHelper.ValidateToken(token);

                if(!validtoken)
                {
                    Response.StatusCode = 404;
                    Response.SuppressContent = true;
                    HttpContext.Current.ApplicationInstance.CompleteRequest();
                }
            }
        }
    }
}
