using Microsoft.EntityFrameworkCore;

namespace VacationScheduler.Models
{
    public class SchedulerContext : DbContext
    {
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Vacation> Vacations { get; set; }

        public SchedulerContext(DbContextOptions<SchedulerContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
