using System.Collections.Generic;
using System.Linq;
using JiraGenerator.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace JiraGenerator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProjectController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;
        private List<ProjectGroup> _projectGroup { get; set; }
        private List<Project> _projects { get; set; }
        public ProjectController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
            _projectGroup = new List<ProjectGroup>();
            if (System.IO.File.Exists("ProjectPath.json"))
            {
                var text = System.IO.File.ReadAllText("ProjectPath.json");
                _projects = JsonConvert.DeserializeObject<List<Project>>(text).OrderBy(x => x.Name).ToList();
            }
            else
            {
                _projects = new List<Project>();
            }
        }

        [HttpGet]
        public List<Project> Get()
        {
            return _projects;
        }

        [HttpPost]
        public void Post(List<Project> projects)
        {
            if (System.IO.File.Exists("ProjectPath.json"))
            {
                System.IO.File.WriteAllText("ProjectPath.json", JsonConvert.SerializeObject(projects));
            }
        }
    }
}
