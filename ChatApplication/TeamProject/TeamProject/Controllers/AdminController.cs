using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Helpers;
using System.Web.Http;
using TeamProject.Models;

namespace TeamProject.Controllers
{
    [Authorize(Roles ="Admin")]
    [RoutePrefix("api/Admin")]
    public class AdminController : ApiController
    {
        [HttpGet]
        public IHttpActionResult Get()
        {
            var vmUsers = new List<SimpleUserVM>();
            var users = new List<User>();
            var db = new DatabaseAccess();
            users = db.GetSimpleUsers();

            foreach (var item in users)
            {
                vmUsers.Add(new SimpleUserVM
                {
                    FirstName = item.FirstName,
                    LastName = item.LastName,
                    Username = item.Username
                });
            }
            return Json(vmUsers);
        }
 
        [HttpPost]
        [Route("MakeAdmin")]
        public IHttpActionResult MakeAdmin([FromBody] string username)
        {
            var db = new DatabaseAccess();
            db.MakeAdmin(username);
            return Ok();
        }


        [HttpPost]
        [Route("Remove")]
        public IHttpActionResult Remove([FromBody] string username)
        {
            var db = new DatabaseAccess();
            db.RemoveAccount(username);
            return Ok();
        }

    }
}
