import { Component } from '@angular/core';
import { AiService } from '../services/ai.service';
import { PhotoService } from '../services/photo.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage { // implements AfterViewInit {


  public results = [];
  public title = 'Classifier';
  public name = 'Benoem object';
  public find = 'Vind object';
  public currentImage = 0;
  public images = [
    'assets/images/no-image.png',
    'assets/images/bird.png',
    'assets/images/cars411.png'
  ];
  public rawImage = null;
  public hasCanvas = false;
  public img = null;
  public obj = null;

  constructor(
    private aiService: AiService,
    private photoService: PhotoService
  ) { }

  public hasPhoto(): boolean {
    return this.rawImage !== null;
  }

  public showCanvas(): boolean {
    return this.hasCanvas;
  }

  public loadPhoto() {
    this.photoService.fromGallery().then((res) => {
      this.img = res.dataUrl;
    });
  }

  public takePhoto() {
    this.photoService.getPhoto().then((res) => {
      this.img = res.dataUrl;
    });
  }

  public classify() {
    const img = document.getElementById('image');
    this.aiService.classify(img).then((res) => {
      this.results = res;
    });
  }

  public predict() {
    const img = document.getElementById('image');
    this.aiService.detect(img).then((res) => {
      // this.results = res;
      this.img = img;
      this.obj = res[0];
      // this.createCanvas(img, res[0]);
      this.hasCanvas = true;
    });
  }

  // private createCanvas(img, result) {
  //   // Empty image for example purposes
  //   // const img = new Image(100, 100);
  //   // const img = new Image(image);

  //   // Creating a canvas for example purposes
  //   const mainCanvas = document.getElementById('canvas') as HTMLCanvasElement;
  //   const mainCtx = mainCanvas.getContext('2d');

  //   // Create an offscreen buffer
  //   const bufferCanvas = document.createElement('canvas');
  //   const bufferCtx = bufferCanvas.getContext('2d');

  //   // Scale the buffer canvas to match our image
  //   bufferCanvas.width = img.width;
  //   bufferCanvas.height = img.height;
  //   mainCanvas.width = img.width;
  //   mainCanvas.height = img.height;

  //   if (bufferCtx && mainCtx) {
  //     // Draw image to canvas
  //     bufferCtx.drawImage(img, 0, 0, img.width, img.height);
  //     // Draw a rectangle in the center
  //     // bufferCtx.strokeRect(img.width / 2 - 5, img.height / 2 - 5, 10, 10);
  //     // Draw a rectangle over te object
  //     bufferCtx.strokeRect(result.x, result.y, result.width, result.height);

  //     // Draw the buffer to the main canvas
  //     mainCtx.drawImage(bufferCanvas, 0, 0);
  //   }
  // }

  // private drawImageScaled(img, ctx) {
  //   const canvas = ctx.canvas;
  //   const hRatio = canvas.width / img.width;
  //   const vRatio = canvas.height / img.height;
  //   const ratio = Math.min(hRatio, vRatio);
  //   const centerShiftX = (canvas.width - img.width * ratio) / 2;
  //   const centerShiftY = (canvas.height - img.height * ratio) / 2;
  //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  //   ctx.drawImage(img, 0, 0, img.width, img.height, centerShiftX, centerShiftY, img.width * ratio, img.height * ratio);
  //   return ctx;
  // }

}
