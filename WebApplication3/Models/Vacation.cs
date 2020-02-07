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

        private  static readonly List<Dictionary<string, int>> MaxEmployeesInSameTime = 
            new List<Dictionary<string, int>>(){
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
            var errors = new List<ValidationResult>();
            var _context = (SchedulerContext)validationContext
                         .GetService(typeof(SchedulerContext));

            if (_context.Vacations.Where(x => (x.End >= this.Start) 
                                              && (this.End >= x.Start) && (x.EmployeeId == this.EmployeeId)).Any())
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
            var titleCurrentEmployee = _context.Employees.Find(EmployeeId).Title;
            employeesTogetherInPoint[titleCurrentEmployee]++;
            var intersectVacations = _context.Vacations.Join(
                    _context.Employees,
                    v => v.EmployeeId,
                    e => e.Id,
                    (v, e) => new { e.Title, v.Start, v.End })
                .Where(x => (x.End >= this.Start) && (this.End >= x.Start))
                .ToList();
            var startEndPointVacations = intersectVacations
                .SelectMany(x => new List<ValueTuple<string, bool, DateTime>>() 
                    { (x.Title, true, x.Start), (x.Title, false, x.End) })
                .ToList();

            startEndPointVacations.Sort(
                (x,y)=> x.Item3.CompareTo(x.Item3));
            foreach (var (title, isStartVacation, _) in startEndPointVacations)
            {
                if (isStartVacation)
                {
                    employeesTogetherInPoint[title]++;
                    if (!IsValidDate(employeesTogetherInPoint, titleCurrentEmployee))
                    {
                        errors.Add(new ValidationResult("Limit has been reached"));
                        break;
                    }
                }
                else
                {
                    employeesTogetherInPoint[title]--;
                }
            }
            return errors;
        }

        bool IsValidDate(Dictionary<string, int> employeesInPoint, string title)
        {
            var maxForCurrentEmployee = MaxEmployeesInSameTime
                .Where(x => x.Keys.Contains(title));

            foreach (var rule in maxForCurrentEmployee)
            {
                var isNotValid = true;
                foreach (var key in rule.Keys)
                {
                    isNotValid &= (employeesInPoint[key] == rule[key]);
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
