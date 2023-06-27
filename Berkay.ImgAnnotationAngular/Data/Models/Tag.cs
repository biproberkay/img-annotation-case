using Microsoft.EntityFrameworkCore.Infrastructure;
using System.Text.Json.Serialization;

namespace Berkay.ImgAnnotationAngular.Data.Models
{
    public class Tag
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [JsonIgnore]
        public List<Image> Images { get; set; }
        [JsonIgnore]
        public List<Annotation> Annotations { get; set; } 
    }
}
