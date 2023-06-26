import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  selectedFile: File | null = null;

  constructor(private httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadImage() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.httpClient.post(this.baseUrl+'weatherforecast/upload', formData)
        .subscribe(
          response => {
            console.log('Yükleme başarılı');
            // Gerekli işlemleri gerçekleştirin
          },
          error => {
            console.error('Yükleme hatası:', error);
            // Hata durumunda işlemleri gerçekleştirin
          }
        );
      // Dosya yükleme işlemini gerçekleştirme kodunu buraya ekleyin

      console.log('Seçilen dosya:', this.selectedFile);
      // Yükleme işlemleri vb. burada yapılabilir
    }
  }
}
