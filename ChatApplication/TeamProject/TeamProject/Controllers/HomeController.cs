using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TeamProject.Models;

namespace TeamProject.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
        
        [HttpPost]
        public ActionResult SendMessage(MessageVM msg)
        {
            var db = new DatabaseAccess();
            db.SendMessage(msg, User.Identity.Name);
            return RedirectToAction("Index");
        }

        public ActionResult Admin()
        {
            return View();
        }

        public ActionResult God()
        {
            return View();
        }

       
    }
}
