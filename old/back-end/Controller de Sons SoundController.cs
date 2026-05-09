using Microsoft.AspNetCore.Mvc;
using SonoApp.Services;

namespace SonoApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SoundController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(DataService.Sounds);
        }
    }
}