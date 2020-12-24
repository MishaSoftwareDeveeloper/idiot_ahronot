using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Api.Models;
using Newtonsoft.Json.Linq;

namespace Api.Controllers
{
    public class AlbumsController : ApiController
    {
        private MusicManagmentEntities db = new MusicManagmentEntities();

        // GET: api/Albums
        public IQueryable<Albums> GetAlbums()
        {
            return db.Albums;
        }

        // GET: api/Albums/5
        //[ResponseType(typeof(Albums))]
        //public IHttpActionResult GetAlbums(int id)
        //{
        //    Albums albums = db.Albums.Where(u=>u.id == id).FirstOrDefault();
        //    if (albums == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(albums);
        //}

        // GET: api/Albums/5
        [ResponseType(typeof(Albums))]
        public IHttpActionResult GetAlbumsByUserId(int id)
        {
            Users users = db.Users.Find(id);
            if (users == null)
            {
                return NotFound();
            }

            return Ok(users.Albums);
        }

        // PUT: api/Albums/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAlbums(int id, Albums albums)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != albums.id)
            {
                return BadRequest();
            }

            db.Entry(albums).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AlbumsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Albums
     
        [ResponseType(typeof(void))]
        public IHttpActionResult PostAlbums([FromBody]JObject data)
        {
            int userId = data["userId"].ToObject<int>();
            List<Albums> albums = data["albums"].ToObject<List<Albums>>();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = db.Users.Where(u => u.id == userId).FirstOrDefault();

            if (user!=null)
            {
                foreach(var album in albums)
                {
                    user.Albums.Add(album);
                }
               // db.Configuration.LazyLoadingEnabled = false;
                db.SaveChanges();
            }
            
            return CreatedAtRoute("DefaultApi", new { id = userId }, user.Albums);
        }

        // DELETE: api/Albums/5
        [ResponseType(typeof(Albums))]
        public IHttpActionResult DeleteAlbums(int id)
        {
            Albums albums = db.Albums.Find(id);
            if (albums == null)
            {
                return NotFound();
            }
            
            for(int i=0; i < albums.Users.Count; i++)
            {
                //remove relationships
                var au = albums.Users.ElementAt(i);
                db.Entry(au).State = EntityState.Deleted;
             
            }
     
            db.Entry(albums).State = EntityState.Deleted;
            //db.Albums.Remove(albums);
            db.SaveChanges();

            return Ok(albums);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AlbumsExists(int id)
        {
            return db.Albums.Count(e => e.id == id) > 0;
        }
    }
}