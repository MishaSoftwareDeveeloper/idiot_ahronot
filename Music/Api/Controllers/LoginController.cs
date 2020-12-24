using Api.Helpers;
using Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
//using System.Web.Http.Cors;

namespace Api.Controllers
{
   // [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class LoginController : ApiController
    {
        // GET: api/Login
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Login/5
        public string Get(int id)
        {
           
            return "value";
        }

        // POST: api/Login
        public IHttpActionResult Post([FromBody]Users user)
        {
            Users fuser = null;
            string token = string.Empty;
            using(var context = new MusicManagmentEntities())
            {
                fuser = context.Users.Where(u => u.mail == user.mail).FirstOrDefault();
                if(fuser != null)
                {
                    string decrypted = EncryptionHelper.Decrypt(fuser.password, "UPS");
                    if(decrypted == user.password)
                    {
                        context.Configuration.LazyLoadingEnabled = false;
                        fuser.password = string.Empty;
                        token = TokenHelper.GenerateJSONWebToken(fuser);
                    }
                    else
                    {
                        fuser = null;
                    }
                }
                
            }
            return Ok(new {user = fuser, tokeninfo = token});
        }

        // PUT: api/Login/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Login/5
        public void Delete(int id)
        {
        }
    }
}
