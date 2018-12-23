using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TeamProject.Models
{
    public class MessageVM
    {
       // public int Id { get; set; }
        public string Data { get; set; }
        public DateTime Date { get; set; }
        public string SenderUsername { get; set; }
        public string ReceiverUsername { get; set; }
    }
}