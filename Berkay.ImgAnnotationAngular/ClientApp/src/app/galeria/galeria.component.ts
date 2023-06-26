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

  constructor(private router: Router, private httpClient: HttpClient, @Inject('BASE_URL') private baseUrl : string) { }
  ngOnInit(): void {
    try {
      this.getImages();
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
}

interface Image {
  id: number;
  fileName: string;
  fileType: string;
}
