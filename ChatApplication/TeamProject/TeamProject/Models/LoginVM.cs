using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TeamProject.Models
{
    public class LoginVM
    {
        [Required]
        [Display(Name = "User name")]
        
        public string Username { get; set; }

        [Required]
        [DataType(DataType.Password)]
        
        public string Password { get; set; }

        public string Salt { get; set; }

        public bool RememberMe { get; set; }
    }
}