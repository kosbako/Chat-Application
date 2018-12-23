using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using TeamProject.Models;

namespace TeamProject
{
    public class AppContext:DbContext
    {
        public AppContext() : base("name=AppContext")
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Message> Messages { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
           

            modelBuilder.Entity<User>()
                .ToTable("Users")
                .HasKey(i => i.Id)
                .HasMany(i => i.Roles)
                .WithMany(i => i.Users)
                .Map(m =>
                {
                    m.MapLeftKey("UserId");
                    m.MapRightKey("RoleId");
                    m.ToTable("UserRoles");
                });

            modelBuilder.Entity<User>()
               .HasMany(i => i.MessagesSended)
               .WithRequired(i => i.Sender)
               .HasForeignKey(i => i.SenderId)
               ;

            modelBuilder.Entity<User>()
                .HasMany(i => i.MessagesReceived)
                .WithRequired(i => i.Receiver)
                .HasForeignKey(i => i.ReceiverId);
        }

    }
}