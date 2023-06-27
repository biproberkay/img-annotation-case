import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {
  images: Image[] = [];
  tags: Tag[] = [];

  constructor(private router: Router, private httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  ngOnInit(): void {
    try {
      this.getImages();
      this.getTags();
    } catch (e) {
      throw e;

    }
  }

  getImages(): void {
    this.httpClient.get<any[]>(this.baseUrl+'weatherforecast/images').subscribe(
      (response) => {
        this.images = response;
      },
      (error) => {
        console.error(error);
      }
    )
  }

  selectImage(image: Image) {
    this.router.navigate(['/image-details'], { queryParams: { id: image.id, fileName: image.fileName } });
    console.log(image.fileName);
  }

  tagInput: string = '';

  submitTagForm() {
    const tagName = this.tagInput;
    const requestBody = { tagName };

    console.log('Tag form submitted');
    console.log('Tag:', this.tagInput);

    this.httpClient.post<Tag>(this.baseUrl + 'weatherforecast/tagadd', requestBody, { headers: { 'Content-Type': 'application/json' }})
      .subscribe(
        response => {
          // İstek başarılı olduğunda yapılacak işlemler
          const tag: Tag = {
            id: response.id,
            name: response.name
          }
          this.tags.push(tag);
          console.log('Etiket eklendi:', response);
        },
        error => {
          // İstek başarısız olduğunda yapılacak işlemler
          console.error('Etiket eklenirken hata oluştu:', error);
        }
      );
  }

  getTags(): void {
    this.httpClient.get<Tag[]>(`${this.baseUrl}weatherforecast/tags`).subscribe(
      (response) => {
        this.tags = response;
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

}

interface Image {
  id: number;
  fileName: string;
  fileType: string;
}

interface Tag {
  id: number;
  name: string;
}
