using Berkay.ImgAnnotationAngular.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Berkay.ImgAnnotationAngular.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<ImageData> ImageDatas { get; set; } 

    }
}
