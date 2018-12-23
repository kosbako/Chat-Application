using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TeamProject.Models;
using System.Web.Mvc;

namespace TeamProject
{
    public class DatabaseAccess
    {
        public User Login(string username)
        {
            User user;
            using (AppContext db = new AppContext())
            {
                user = db.Users.Include("Roles")
                    .SingleOrDefault(i => i.Username == username);
            }

            return user;
        }
        
        public bool UserExists(string username)
        {
            using (AppContext db = new AppContext())
            {
                return db.Users.Where(i => i.Username == username).Any();
            }
        }

        public void AddUser(RegisterVM vm)
        {
            using (var db = new AppContext())
            {
                Role r = db.Roles.Find(1);

                User u = new User();
                u.Username = vm.Username;
                var salt = Password.GetSalt();
                var hash = Password.Hash(vm.Password, salt);
                u.Password = Convert.ToBase64String(hash);
                u.Salt = Convert.ToBase64String(salt);
                u.FirstName = vm.FirstName;
                u.LastName = vm.LastName;
                u.Active = true;
                u.Roles = new List<Role>();
                u.Roles.Add(r);

                db.Users.Add(u);
                db.Entry(r).State = System.Data.Entity.EntityState.Unchanged;
                db.SaveChanges();
            }
        }

        public void SendMessage(MessageVM msg, string logedinuser)
        {
            using (var db = new AppContext())
            {
                var message = new Message();
                var sender = db.Users.FirstOrDefault(u => u.Username == logedinuser );
                var receiver = db.Users.FirstOrDefault(i => i.Username == msg.ReceiverUsername);

                message.Data = msg.Data;
                message.Date = DateTime.Now;
                message.SenderId = sender.Id;
                message.ReceiverId = receiver.Id;
                db.Messages.Add(message);
                db.SaveChanges();
            }
        }

        public List<Message> GetUserMessages(string logedinuser)
        {
            using (var db = new AppContext())
            {
                var user = db.Users.FirstOrDefault(u => u.Username == logedinuser);
                return db.Messages.Include("Sender").Include("Receiver").Where(m => m.SenderId == user.Id || m.ReceiverId == user.Id).ToList();

            }
        }

        public List<string> GetActiveUsers(string username)
        {
            using (var db = new AppContext())
            {
                return db.Users.Where(i => i.Active == true && i.Username != username).Select(i => i.Username).ToList();
            }
            
        }

        public List<User> GetSimpleUsers()
        {
            using (var db = new AppContext())
            {
               
                return db.Users.Where(i => i.Roles.Count == 1 && i.Active).ToList();

            }
        }

        public void MakeAdmin(string username)
        {
            using (var db = new AppContext())
            {
                Role r = db.Roles.Find(2);
                var user = db.Users.Include("Roles").FirstOrDefault(i => i.Username == username);
                user.Roles.Add(r);
                db.SaveChanges();
            }
        }

        public void RemoveAccount(string username)
        {
            using (var db = new AppContext())
            {
                var user = db.Users.FirstOrDefault(i => i.Username == username);
                user.Active = false;
                db.SaveChanges();
            }
        }
    }
}