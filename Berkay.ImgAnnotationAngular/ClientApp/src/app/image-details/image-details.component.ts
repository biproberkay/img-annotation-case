import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//@ts-ignore
import { Annotorious } from '@recogito/annotorious';
import '@recogito/annotorious/dist/annotorious.min.css';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent implements AfterViewInit {
  id: number | undefined;
  filename: string | undefined;

  @ViewChild('annotate', { static: false }) public annotate: ElementRef | undefined;
  imageAnnotate: any;
  annotations: any = [];

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.id = params['imageId'];
      this.filename = params['fileName'];
      console.log(this.filename);
    })
  }

  ngAfterViewInit(): void {
    this.imageAnnotate = new Annotorious({
      image: this.annotate?.nativeElement,      
      widgets: ['TAG'],
    });

    this.imageAnnotate.on('createAnnotation', (annotation: any, overrideId: any) => {
      const targetElement = annotation.target; // Hedef özellikleri içeren nesne

      // Geometri bilgilerine erişmek için selector özelliğini kullanabilirsiniz
      const selector = targetElement.selector;
      const xywhValue = selector.value; // "xywh=pixel:3,322,68,86"

      // İlgili bilgileri ayrıştırmak için gereken işlemleri yapabilirsiniz
      const xywhParts = xywhValue.split('=')[1].split(','); // ["pixel:3", "322", "68", "86"]
      const x = parseInt(xywhParts[0].split(':')[1]); // 3
      const y = parseInt(xywhParts[1]); // 322
      const width = parseInt(xywhParts[2]); // 68
      const height = parseInt(xywhParts[3]); // 86

      console.log('x:', x);
      console.log('y:', y);
      console.log('width:', width);
      console.log('height:', height);
      this.annotations.push(annotation);
    });
  }


  save() {
    this.annotations = this.imageAnnotate.getAnnotations();
  }

  del(id: any) {
    this.imageAnnotate.removeAnnotation(id);
    this.annotations = this.imageAnnotate.getAnnotations();
  }

  clear() {
    this.imageAnnotate.clearAnnotations();
  }

  annotateAgain() {
    this.imageAnnotate.setAnnotations(this.annotations);
    this.imageAnnotate.readOnly = true;
  }

  createBoundingBox() {
    // Bounding box oluşturma işlemleri
  }

  updateBoundingBox() {
    // Bounding box güncelleme işlemleri
  }
}
interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}


