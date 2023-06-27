using Berkay.ImgAnnotationAngular.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace Berkay.ImgAnnotationAngular.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Image> Images { get; set; }
        public DbSet<Annotation> Annotations { get; set; }
        public DbSet<Tag> Tags { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Image>()
                .HasMany(e => e.Tags)
                .WithMany(e => e.Images)
                .UsingEntity<Annotation>();
        }

    }
}
