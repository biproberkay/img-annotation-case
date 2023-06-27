using Berkay.ImgAnnotationAngular.Data.Models;
using Berkay.ImgAnnotationAngular.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Berkay.ImgAnnotationAngular.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly IImageService _imageService;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IImageService? imageService)
        {
            _logger = logger;
            _imageService = imageService;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpGet("images")]
        public IEnumerable<Image> GetImages()
        {
            return _imageService.GetImages().ToArray();
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("Geçersiz dosya");
            }
            var result = await _imageService.SaveImageAsync(file);
            return Ok(result);
        }

        [HttpPost("tagadd")]
        public ActionResult TagAdd([FromBody] JsonElement data)
        {
            string tagName = data.GetProperty("tagName").GetString();
            return Ok(_imageService.AddTag(tagName));
        }

        [HttpGet("tags")]
        public IEnumerable<Tag> GetTags()
        {
            return _imageService.GetTags();
        }

        [HttpPost("annotationadd")]
        public bool AddAnnotation([FromBody] AnnotationCreateDto annotation)
        {
            return _imageService.AddAnnotation(annotation);
        }
    }
}