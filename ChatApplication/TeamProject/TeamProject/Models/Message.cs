using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TeamProject.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string Data { get; set; }
        public DateTime Date { get; set; }

        public int SenderId { get; set; }
        public int ReceiverId { get; set; }

        public User Sender { get; set; }
        public User Receiver { get; set; }
    }
}