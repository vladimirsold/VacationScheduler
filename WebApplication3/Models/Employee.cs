using System.ComponentModel.DataAnnotations;

namespace VacationScheduler.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Title { get; set; }
        public Vacation NextVacation { get; set; }
    }
}
