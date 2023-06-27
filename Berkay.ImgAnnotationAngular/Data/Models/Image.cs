using System.Text.Json.Serialization;

namespace Berkay.ImgAnnotationAngular.Data.Models
{
    public class Image
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string FileType { get; set; }
        [JsonIgnore]
        public List<Tag> Tags { get; set; }
        [JsonIgnore]
        public List<Annotation> Annotations { get; set; }
    }

}
