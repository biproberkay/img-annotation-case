using System.Text.Json.Serialization;

namespace Berkay.ImgAnnotationAngular.Data.Models
{
    public class Annotation
    {
        public int LeftUpX { get; set; }
        public int LeftUpY { get; set; }
        public int Width { get; set; }
        public int Height { get; set; } 
        public int ImageId { get; set; }
        [JsonIgnore]
        public Image Image { get; set; }
        public int TagId { get; set; }
        [JsonIgnore]
        public Tag Tag { get; set; }
    }

    public record AnnotationCreateDto(int LeftUpX, int LeftUpY, int Width, int Height, int ImageId, int TagId)
    { }
}