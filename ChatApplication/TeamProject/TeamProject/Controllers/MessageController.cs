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
    public class MessageController : ApiController
    {
        [HttpGet]
        public IHttpActionResult Get()
        {
            var messages = new List<Message>();
            var vmMessages = new List<MessageVM>();
            var db = new DatabaseAccess();
            messages = db.GetUserMessages(User.Identity.Name);
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

