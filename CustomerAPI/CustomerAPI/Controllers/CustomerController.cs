using CustomerAPI.Data;
using CustomerAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly UserDbContext _context;
        public CustomerController(UserDbContext userDbContext)
        {
            _context = userDbContext;
        }
        [HttpPost("add_customer")]
        public IActionResult AddCustomer([FromBody] CustomerModel customerObj)
        {
            if (customerObj == null)
            {
                return BadRequest();
            }
            else
            {
                _context.customerModels.Add(customerObj);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Customer Added Successfully"
                });
            }
        }
        [HttpPut("update_customer")]
        public IActionResult UpdateCustomer([FromBody] CustomerModel customerObj)
        {
            if (customerObj == null)
            {
                return BadRequest();
            }
            var user = _context.customerModels.AsNoTracking().FirstOrDefault(x => x.Id == customerObj.Id);
            if (user == null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = " User Not Found"
                });
            }
            else
            {
                _context.Entry(customerObj).State = EntityState.Modified;
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = " Customer Updated Successfully"
                });
            }
        }
        [HttpDelete("delete_customer/{id}")]
        public IActionResult DeleteCustomer(int id)
        {
            var user = _context.customerModels.Find(id);
            if (user == null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "User Not Found"
                });
            }
            else
            {
                _context.Remove(user);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Customer Deleted"
                });
            }
        }
        [HttpGet("get_all_customers")]
        public IActionResult GetAllCustomers()
        {
            var customers = _context.customerModels.AsQueryable();
            return Ok(new
            {
                StatusCode = 200,
                CustomerDetails =customers
            });
        }
        [HttpGet("get_customer/id")]
        public IActionResult Getcustomer(int id)
        {
            var employee = _context.customerModels.Find(id);
            if (employee == null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "User Not Found"
                });
            }
            else
            {
                return Ok(new
                {
                    StatusCode = 200,
                    EmployeeDetail = employee
                });
            }
        }
    }
}

