import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
//@ts-ignore
import { Annotorious } from '@recogito/annotorious';
import '@recogito/annotorious/dist/annotorious.min.css';
import { SELECT } from '../widgets/select';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent implements AfterViewInit {
  id: number = 0;
  filename: string | undefined;
  tags: Tag[] = [];

  @ViewChild('annotativeimage', { static: false })
    public annotativeimage!: ElementRef;

  imageAnno: any;
  annotations: any = [];

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      this.filename = params['fileName'];
      //console.log(this.filename);
    })
  }

  ngAfterViewInit(): void {
    this.httpClient.get<Tag[]>(`${this.baseUrl}weatherforecast/tags`).subscribe(
      (response) => {
        this.tags = response;
        console.log(this.tags.map((tag) => tag.name));
        const widget = { widget: SELECT, options: this.tags.map((tag) => tag.name) };
        this.imageAnno = new Annotorious({
          image: this.annotativeimage.nativeElement,
          widgets: [widget],
        });

        //console.log(this.imageAnno);

        this.imageAnno.on('createAnnotation', (annotation: any) => {
          //const targetElement = annotation.target; // Hedef özellikleri içeren nesne
          //const selector = targetElement.selector;
          const xywhValue = annotation.target.selector.value; // "xywh=pixel:3,322,68,86"
          console.log(xywhValue);

          // İlgili bilgileri ayrıştırmak için gereken işlemleri yapabilirsiniz
          const xywhParts = xywhValue.split('=')[1].split(','); // ["pixel:3", "322", "68", "86"]
          const x = parseInt(xywhParts[0].split(':')[1]); // 3
          const y = parseInt(xywhParts[1]); // 322
          const width = parseInt(xywhParts[2]); // 68
          const height = parseInt(xywhParts[3]); // 86

          //console.log('x:', x);
          //console.log('y:', y);
          //console.log('width:', width);
          //console.log('height:', height);
          const matchedTag = this.tags.find(tag => tag.name === annotation.body[0].value);
          const matchedTagId = matchedTag ? matchedTag.id : 0;
          //console.log(matchedTagId);

          const anno: Annotation = {
            leftUpX: x,
            leftUpY: y,
            width: width,
            height: height,
            imageId: this.id, // ImageId değerini ata
            tagId: matchedTagId // TagId değerini ata
          };

          console.log(anno);
          this.httpClient.post(`${this.baseUrl}weatherforecast/annotationadd`, anno).subscribe(
            (response) => {
              console.log('Kayıt başarıyla yapıldı:', response);
              // Kayıt başarılı olduğunda yapılacak işlemler
            },
            (error) => {
              console.error('Kayıt sırasında hata oluştu:', error);
              // Kayıt sırasında hata olduğunda yapılacak işlemler
            }
          );

          console.log(annotation);
          this.annotations.push(annotation);
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  save() {
    this.annotations = this.imageAnno.getAnnotations();
  }

  del(id: any) {
    this.imageAnno.removeAnnotation(id);
    this.annotations = this.imageAnno.getAnnotations();
  }

  clear() {
    this.imageAnno.clearAnnotations();
  }

  annotateAgain() {
    this.imageAnno.setAnnotations(this.annotations);
    this.imageAnno.readOnly = true;
  }

  createBoundingBox() {
    // Bounding box oluşturma işlemleri
  }

  updateBoundingBox() {
    // Bounding box güncelleme işlemleri
  }
}

interface Annotation {
  leftUpX: number;
  leftUpY: number;
  width: number;
  height: number;
  imageId: number;
  tagId: number;
}

interface Tag {
  id: number;
  name: string;
}


