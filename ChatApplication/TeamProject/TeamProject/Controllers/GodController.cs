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
    [Authorize(Roles ="God")]
    public class GodController : ApiController
    {
        [HttpPost]
        public IHttpActionResult UserMessages([FromBody] string username)
        {
            var messages = new List<Message>();
            var vmMessages = new List<MessageVM>();
            var db = new DatabaseAccess();
            messages = db.GetUserMessages(username);
            foreach (var item in messages)
            {
                vmMessages.Add(new MessageVM
                {
                    Data = item.Data,
                    Date = item.Date,
                    SenderUsername = item.Sender.Username,
                    ReceiverUsername = item.Receiver.Username

                });

            }
 
            return Json(vmMessages);
        }
    }
}
