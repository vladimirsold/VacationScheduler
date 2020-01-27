using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication3.Models;

namespace WebApplication3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VacationsController : ControllerBase
    {
        private readonly EmployeesContext _context;

        public VacationsController(EmployeesContext context)
        {
            _context = context;
        }

        // GET: api/Vacations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vacation>>> GetVacations()
        {
            return await _context.Vacations.ToListAsync();
        }

        // GET: api/Vacations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ICollection<Vacation>>> GetVacation(int id)
        {
            //var vacation = await _context.Vacations.FindAsync(id);
            var employeeVacation = await _context.Vacations.Where(x => x.EmployeeId == id).ToListAsync();
            //if (vacation == null)
            //{
            //    return NotFound();
            //}
            if (employeeVacation == null)
            {
                return NotFound();
            }
            return employeeVacation;
        }

        [HttpGet("Top")]
        public async Task<ActionResult<ICollection<Vacation>>> GetTopVacations()
        {
            return await _context.Vacations.ToListAsync();
        }

        // PUT: api/Vacations/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVacation(int id, Vacation vacation)
        {
            if (id != vacation.Id)
            {
                return BadRequest();
            }

            _context.Entry(vacation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VacationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Vacations
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Vacation>> PostVacation([FromBody]Vacation vacation)
        {
            _context.Vacations.Add(vacation);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVacation", new { id = vacation.Id }, vacation);
        }

        // DELETE: api/Vacations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Vacation>> DeleteVacation(int id)
        {
            var vacation = await _context.Vacations.FindAsync(id);
            if (vacation == null)
            {
                return NotFound();
            }

            _context.Vacations.Remove(vacation);
            await _context.SaveChangesAsync();

            return vacation;
        }

        private bool VacationExists(int id)
        {
            return _context.Vacations.Any(e => e.Id == id);
        }
    }
}
