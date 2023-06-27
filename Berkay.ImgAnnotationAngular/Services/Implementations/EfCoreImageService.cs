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

        public bool AddAnnotation(AnnotationCreateDto annotation)
        {
            try
            {
                var anno = new Annotation
                {
                    LeftUpX = annotation.LeftUpX,
                    LeftUpY = annotation.LeftUpY,
                    Width = annotation.Width,
                    Height = annotation.Height,
                    ImageId = annotation.ImageId,
                    TagId = annotation.TagId
                };
                _dbContext.Annotations.Add(anno);
                _dbContext.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
                throw;
            }
        }

        public Tag AddTag(string name)
        {
            var entry = _dbContext.Set<Tag>().Add(new Tag { Name = name });
            _dbContext.SaveChanges();
            return entry.Entity;
        }

        public IEnumerable<Data.Models.Image> GetImages()
        {
            return _dbContext.Images.AsNoTracking().ToArray();
        }

        public List<Tag> GetTags()
        {
            return _dbContext.Set<Tag>().ToList();
        }

        public async Task<Data.Models.Image> SaveImageAsync(IFormFile file)
        {
            string targetDirectory = "ClientApp/src/assets/images";
            string uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
            string filePath = Path.Combine(targetDirectory, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            var image = new Data.Models.Image
            {
                FileName = uniqueFileName,
                FileType = file.ContentType.Split('/')[1]
            };
            var imageEntry = _dbContext.Images.Add(image);
            var savedData = imageEntry.Entity;
            _dbContext.SaveChanges();
            return savedData;
        }
    }
}
