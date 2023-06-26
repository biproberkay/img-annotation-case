using Berkay.ImgAnnotationAngular.Data.Models;
using Berkay.ImgAnnotationAngular.Services;
using Microsoft.AspNetCore.Mvc;

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
        public IEnumerable<ImageData> GetImages()
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

            // Resim dosyasını kaydetme işlemini burada gerçekleştirin
            string targetDirectory = "ClientApp/src/assets/images";
            string uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
            string filePath = Path.Combine(targetDirectory, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Dosya adını, dosya yolunu ve ID'yi veritabanına kaydedebilirsiniz
            var result = _imageService.SaveImage(uniqueFileName, file.ContentType.Split('/')[1]);
            return Ok(result);
        }

    }
}