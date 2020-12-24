using Api.Helpers;
using Api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Api.Controllers
{
    public class RegistrationController : ApiController
    {
        // GET: api/Registration
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Registration/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Registration
        public IHttpActionResult Post([FromBody]Users user)
        {
            bool registrated = false;
            user.password = EncryptionHelper.Encrypt(user.password, "UPS");
            using(var context = new MusicManagmentEntities())
            {
                context.Users.Add(user);
                context.SaveChanges();
                registrated = true;
            }
            user.password = string.Empty;
            return Ok(new { user = user, tokeninfo= TokenHelper.GenerateJSONWebToken(user)});
        }

        // PUT: api/Registration/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Registration/5
        public void Delete(int id)
        {
        }
    }
}
