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
        Jira _jiraClient;
        public PatchController()
        {
            _jiraClient = Jira.CreateRestClient("https://jira.cmdkman.com/", "kervin.tsai", "pass@word1");
        }

        [HttpPost]
        [Route("Submit")]
        public async Task<IActionResult> Submit([FromBody] PatchParam param)
        {
            try
            {
                await ImportResult(param);
            }
            catch (System.Exception ex)
            {
                return BadRequest(ex);
            }
            return Ok();
        }

        [HttpPost]
        [Route("Search")]
        public async Task<Dictionary<string,string>> Search([FromBody] PatchParam param)
        {
            var result = await GetData(param);
            return result;
        }

        private async Task<Dictionary<string,string>> GetData(PatchParam param)
        {
            var result = new Dictionary<string,string>();
            if (string.IsNullOrWhiteSpace(param.patchId))
            {
                param.patchId = "CREDIT-2425";
            }
            var searchResult = await _jiraClient.Issues.GetIssueAsync(param.patchId);
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
                    result.Add(link.InwardIssue.Key.ToString(), desc);
                }
            }
            return result;
        }

        private async Task ImportResult(PatchParam param)
        {
            var patchIssue = await _jiraClient.Issues.GetIssueAsync(param.patchId);
            foreach (var item in param.result)
            {
                await patchIssue.AddCommentAsync(item.Value);
            }
        }
    }
    public class PatchParam
    {
        public string patchId { get; set; }
        public string keyword { get; set; }
        public Dictionary<string,string> result { get; set; }
    }
}
