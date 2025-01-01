using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ApiServer.Models;
using Microsoft.AspNetCore.Authorization;
namespace ApiServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Require valid JWT token for all endpoints in this controller
    public class TasksController : ControllerBase
    {
        private static List<TaskItem> Tasks = new List<TaskItem>();

        [HttpGet]
        public ActionResult<IEnumerable<TaskItem>> GetTasks()
        {
            return Ok(Tasks);
        }

        [HttpPost]
        public ActionResult<TaskItem> AddTask(TaskItem newTask)
        {
            newTask.Id = Guid.NewGuid();
            Tasks.Add(newTask);
            return Ok(newTask);
        }

        [HttpPut("{id}")]
        public IActionResult ToggleTaskCompletion(Guid id)
        {
            var task = Tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return NotFound();

            task.Completed = !task.Completed;
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTask(Guid id)
        {
            var task = Tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return NotFound();

            Tasks.Remove(task);
            return NoContent();
        }
    }
}