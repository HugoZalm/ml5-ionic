import { Component } from '@angular/core';
import { AiService } from '../services/ai.service';
import { PhotoService } from '../services/photo.service';
// import * as ml5 from 'ml5';
declare let ml5: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage { // implements AfterViewInit {


  public results = [];
  public title = 'Classifier';
  public search = 'Zoek';
  public currentImage = 0;
  public images = [
    'assets/images/no-image.png',
    'assets/images/bird.png',
    'assets/images/cars411.png'
  ];
  public rawImage = null;

  constructor(
    private aiService: AiService,
    private photoService: PhotoService
  ) {}

  public hasPhoto(): boolean {
    return this.rawImage !== null;
  }

  public takePhoto() {
    this.photoService.getPhoto().then((res) => {
      this.rawImage = res;
    });
  }

  public classify() {
    const img = document.getElementById('image');
    this.aiService.classify(img).then((res) => {
      this.results = res;
    });
  }

}
