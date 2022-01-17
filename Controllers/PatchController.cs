using System.Collections.Generic;
using System.Threading.Tasks;
using Atlassian.Jira;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace JiraGenerator.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatchController : ControllerBase
    {
        public PatchController()
        {
        }

        [HttpPost]
        public async Task<List<string>> Post([FromBody] PatchParam param)
        {
            var result = await GetData(param);
            return result;
        }

        private async Task<List<string>> GetData(PatchParam param)
        {
            var result = new List<string>();
            if (string.IsNullOrWhiteSpace(param.patchId))
            {
                param.patchId = "CREDIT-2425";
            }
            var client = Jira.CreateRestClient("https://jira.cmdkman.com/", "kervin.tsai", "pass@word1");
            var searchResult = await client.Issues.GetIssueAsync(param.patchId);
            var linkList = await searchResult.GetIssueLinksAsync();
            foreach (var link in linkList)
            {
                var desc = link.InwardIssue.Description;
                if (string.IsNullOrWhiteSpace(param.keyword) == false && desc.IndexOf(param.keyword) < 0)
                {
                    continue;
                }
                var index = desc.IndexOf("異動程式：");
                if (index > 0)
                {
                    desc = desc.Remove(0, index);
                    result.Add($"{link.InwardIssue.Key} ---- \r\n {desc}");
                }
            }
            return result;
        }
    }
    public class PatchParam
    {
        public string patchId { get; set; }
        public string keyword { get; set; }
    }
}
