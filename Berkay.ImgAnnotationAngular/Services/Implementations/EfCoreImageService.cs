using Berkay.ImgAnnotationAngular.Data;
using Berkay.ImgAnnotationAngular.Data.Models;
using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;

namespace Berkay.ImgAnnotationAngular.Services.Implementations
{
    public class EfCoreImageService : IImageService
    {
        private readonly ApplicationDbContext _dbContext;

        public EfCoreImageService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<ImageData> GetImages()
        {
            return _dbContext.ImageDatas.AsNoTracking().ToArray();
        }

        public ImageData SaveImage(string fileName, string fileType)
        {
            var image = new ImageData
            {
                FileName = fileName,
                FileType = fileType
            };
            var imageEntry = _dbContext.ImageDatas.Add(image);
            var savedData = imageEntry.Entity;
            _dbContext.SaveChanges();
            return savedData;
        }
    }
}
