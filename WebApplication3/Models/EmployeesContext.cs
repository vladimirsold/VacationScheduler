using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VacationScheduler.Models
{
    public class EmployeesContext : DbContext
    {
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Vacation> Vacations { get; set; }

        public EmployeesContext(DbContextOptions<EmployeesContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
