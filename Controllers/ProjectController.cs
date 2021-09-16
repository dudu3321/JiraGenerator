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
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };
        private readonly string[] NUMBER_TO_STRING = new string[] { "一", "二", "三", "四", "五", "六", "七", "八", "九" };
        private readonly string HEADER = "||Project Name||Project Path||Branch Name||Version||Note||";
        private readonly string DBHEADER = @"||Database||File Name||Branch Name||Note||
| | | | |";

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
              return  _projects;
        }
    }
}
