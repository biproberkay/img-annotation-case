using Berkay.ImgAnnotationAngular.Data.Models;

namespace Berkay.ImgAnnotationAngular.Services
{
    public interface IImageService
    {
        IEnumerable<Image> GetImages();
        Task<Image> SaveImageAsync(IFormFile file);
        Tag AddTag(string tagName);
        List<Tag> GetTags();
        bool AddAnnotation(AnnotationCreateDto annotation);
    }
}
