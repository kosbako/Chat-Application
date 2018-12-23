using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TeamProject.Models;

namespace TeamProject.Controllers
{
    [Authorize]
    public class UserController : ApiController
    {
        [HttpGet]
        public IHttpActionResult Get()
        {
            var users = new List<string>();
            var db = new DatabaseAccess();
            var messages = db.GetUserMessages(User.Identity.Name);
            users = db.GetActiveUsers(User.Identity.Name);
            foreach (var item in messages)
            {
                if (users.Contains(item.Sender.Username))
                {
                    users.Remove(item.Sender.Username);
                }
                if (users.Contains(item.Receiver.Username))
                {
                    users.Remove(item.Receiver.Username);
                }
            }
            return Json(users);
        }
    }
}
