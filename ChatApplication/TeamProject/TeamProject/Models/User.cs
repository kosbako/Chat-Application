using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TeamProject.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool Active { get; set; }
        public string Salt { get; set; }

        public List<Role> Roles { get; set; }

        public List<Message> MessagesSended { get; set; }
        public List<Message> MessagesReceived { get; set; }
    }
}