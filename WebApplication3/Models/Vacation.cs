using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace VacationScheduler.Models
{
    public class Vacation : IValidatableObject
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public int EmployeeId { get; set; }
        [Required]
        public DateTime Start { get; set; }
        [Required]
        public DateTime End { get; set; }

        static readonly List<Dictionary<string, int>> maxEmployeesTogether = new List<Dictionary<string, int>>(){
                new Dictionary<string,int>()
                {
                    ["Dev"] = 3
                },
                new Dictionary<string, int>()
                {
                    ["Dev"]= 1,
                    ["TeamLead"]=1
                },
                new Dictionary<string, int>()
                {
                    ["Dev"]= 1,
                    ["QA"]= 2
                },
                new Dictionary<string, int>()
                {
                    ["TeamLead"] = 2
                },
                new Dictionary<string, int>()
                {
                    ["QA"]= 4
                }
            };

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> errors = new List<ValidationResult>();
            var _context = (SchedulerContext)validationContext
                         .GetService(typeof(SchedulerContext));

            if (_context.Vacations.Where(x => (x.End >= this.Start) && (this.End >= x.Start) && (x.EmployeeId == this.EmployeeId)).Count() > 0)
            {
                errors.Add(new ValidationResult("Employee have vacation in this range of date"));
                return errors;
            }


            var employeesTogetherInPoint = new Dictionary<string, int>()
            {
                ["Dev"] = 0,
                ["QA"] = 0,
                ["TeamLead"] = 0
            };
            var title = _context.Employees.Find(EmployeeId).Title;
            employeesTogetherInPoint[title]++;
            var query = _context.Vacations.Join(_context.Employees,
                v => v.EmployeeId,
                e => e.Id,
                (v, e) => new { e.Title, v.Start, v.End }
                );
            var intersectionVacations = query
                .Where(x => (x.End >= this.Start) && (this.End >= x.Start))
                .ToList()
                .SelectMany(x => new List<ValueTuple<string, bool, DateTime>>() { (x.Title, true, x.Start), (x.Title, false, x.End) })
                .ToList();

            intersectionVacations.OrderBy(x => x.Item3);
            foreach (var e in intersectionVacations)
            {
                if (e.Item2)
                {
                    employeesTogetherInPoint[e.Item1]++;
                    if (!IsValidDate(employeesTogetherInPoint, title))
                    {
                        errors.Add(new ValidationResult("Limit has been reached"));
                        break;
                    }
                }
                else
                {
                    employeesTogetherInPoint[e.Item1]--;
                }
            }
            return errors;
        }

        bool IsValidDate(Dictionary<string, int> employeesInPoint, string title)
        {
            var maxForCurrentEmployee = maxEmployeesTogether.Where(x => x.Keys.Contains(title));

            foreach (var e in maxForCurrentEmployee)
            {
                var isNotValid = true;
                foreach (var key in e.Keys)
                {
                    isNotValid &= (employeesInPoint[key] == e[key]);
                }
                if (isNotValid)
                {
                    return false;
                }
            }
            return true;
        }
    }
}
