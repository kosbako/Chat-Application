using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using TeamProject.Models;

namespace TeamProject.Controllers
{
    public class AuthController : Controller
    {
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Login(LoginVM login)
        {
            User user;

            if (!ModelState.IsValid)
            {
                return View(login);
            }

            var db = new DatabaseAccess();
            user = db.Login(login.Username);
            if (user != null)
            {
                if (!user.Active && user.Username.ToLower() != "god")
                {
                    ViewBag.Error = "Removed";
                    return View("Login");
                }
                var salt = user.Salt;
                var hash = Password.Hash(login.Password, Convert.FromBase64String(salt));
                login.Password = Convert.ToBase64String(hash);
            }

            

            if (user != null && login.Password == user.Password)
            {
                var userRoles = string.Join("|", user.Roles.Select(i => i.RoleName));

                var ticket = new FormsAuthenticationTicket(version: 1,
                                   name: login.Username,
                                   issueDate: DateTime.Now,
                                   expiration: DateTime.Now.AddDays(5),
                                   isPersistent: login.RememberMe,
                                   userData: userRoles);

                var encryptedTicket = FormsAuthentication.Encrypt(ticket);
                var cookie = new HttpCookie(FormsAuthentication.FormsCookieName,
                    encryptedTicket);

                HttpContext.Response.Cookies.Add(cookie);

                if (login.Username.ToLower() == "god")                
                {
                    return RedirectToAction("God", "Home");
                }
                else
                {
                    return RedirectToAction("Index", "Home");
                }
            }
            else
            {
                ViewBag.Error = "fail";
                return View("Login");
            }


        }
       
        public ActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Register(RegisterVM vm)
        {
            if (!ModelState.IsValid)
            {
                return View(vm);
            }

            var db = new DatabaseAccess();
            if (db.UserExists(vm.Username))
            {
                ViewData["Message"] = "fail";
                return View(vm);
            }
            else
            {
                db.AddUser(vm);
            }
            return RedirectToAction("Login");
        }
        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Login", "Auth");
        }

    }
}