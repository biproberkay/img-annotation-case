using Berkay.ImgAnnotationAngular.Data.Models;

namespace Berkay.ImgAnnotationAngular.Services
{
    public interface IImageService
    {
        IEnumerable<ImageData> GetImages();
        ImageData SaveImage(string fileName, string fileType);
    }
}
