import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { AiService } from 'src/app/services/ai.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit, OnChanges {

  @ViewChild('canvas', { read: ElementRef }) myCanvas: ElementRef;
  @Input() img: any;
  @Input() obj: any;

  public result = '';

  private image = new Image();
  private canvas;
  private ctx: CanvasRenderingContext2D;
  private ratio: number;

  constructor(
    private aiService: AiService
  ) { }

  ngOnInit() {
    this.image.src = 'assets/images/no-image.png';
    this.image.onload = () => {
      setTimeout(() => {
        this.setupCanvas();
        this.loadImage();
      }, 1000);
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'img':
            this.image.src = changes.img.currentValue;
            this.image.onload = () => {
              setTimeout(() => {
                this.loadImage();
                this.predict();
              }, 1000);
            };
            break;
          case 'obj':
            // this.doSomething(change.currentValue);
            break;
        }
      }
    }
  }

  private setupCanvas() {
    this.canvas = this.myCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d');
  }

  private loadImage() {
    this.ratio = this.image.width / this.canvas.width;
    this.canvas.height = this.image.height / this.ratio;
    this.ctx.drawImage(this.image, 0, 0, this.image.width / this.ratio, this.image.height / this.ratio);
  }

  private predict() {
    this.aiService.detect(this.image).then((res) => {
      res.forEach((r) => this.drawBox(r));
    });
  }

  private drawBox(result) {
    const x = result.x / this.ratio;
    const y = result.y / this.ratio;
    const width = result.width / this.ratio;
    const height = result.height / this.ratio;
    const font = 14;
    const padding = 3;

    this.ctx.strokeRect( x, y, width, height);
    this.ctx.font = font + 'px serif';
    this.ctx.fillStyle = '#0000ff';
    this.ctx.fillRect( x , y, width, font + (padding * 2));
    this.ctx.fillStyle = '#ffffff';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(result.label, x + padding, y + font/2 + padding);
  }

}




/*
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
})
export class ImageComponent implements OnInit {

  @Input() image: HTMLImageElement;
  @Input() obj: any;

  public img;

  constructor() {
    this.img = new Image(225,225);
    this.img.src = 'assets/images/no-image.png';
  }

  ngOnInit() {
    if (this.image !== null && this.image !== undefined) {
      this.img = this.image;
    }
    this.createCanvas();
  }

  private createCanvas() {
    // Get canvas
    const mainCanvas = document.getElementById('canvas') as HTMLCanvasElement;
    const mainCtx = mainCanvas.getContext('2d');

    // Create an offscreen buffer
    const bufferCanvas = document.createElement('canvas');
    const bufferCtx = bufferCanvas.getContext('2d');

    // Scale the buffer canvas to match our image
    bufferCanvas.width = this.img.width;
    bufferCanvas.height = this.img.height;
    mainCanvas.width = this.img.width;
    mainCanvas.height = this.img.height;

    if (bufferCtx && mainCtx) {
      // Draw image to canvas
      bufferCtx.drawImage(this.img, 0, 0, this.img.width, this.img.height);
      // Draw a rectangle over te object
      if (this.obj !== null) {
        bufferCtx.strokeRect(this.obj.x, this.obj.y, this.obj.width, this.obj.height);
      }
      // Draw the buffer to the main canvas
      mainCtx.drawImage(bufferCanvas, 0, 0);
    }
  }

}
*/
