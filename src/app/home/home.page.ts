import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import * as ml5 from 'ml5';
declare let ml5: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  // @ViewChild('image', {read: ElementRef}) img: ElementRef;
  private classifier;

  constructor() {
  }

  ngOnInit() {
    // this.preload();
    // this.setup();
    const image = document.getElementById('image');
    this.classify(image);
  }

  private classify(image) {
    ml5.imageClassifier('MobileNet')
    .then(classifier => classifier.classify(image))
    .then(results => {
      console.log('Result: ' + results[0].label + ' (' + results[0].confidence.toFixed(4) + ')');
      console.log('Results', results);
      // result.innerText = results[0].label;
      // probability.innerText = results[0].confidence.toFixed(4);
    });
  }

  private preload() {
    // this.classifier = ml5.imageClassifier('MobileNet', this.setup);
    ml5.imageClassifier('MobileNet', this.setup);
    const x = 1;
    // this.img = loadImage('images/bird.png');
    // this.img = loadImage('images/zonnebloem.jpg');
      // this.img = ml5.loadImage('images/cars411.png');
  }

  private setup(error, result) {
    // createCanvas(400, 400);
    const img = document.getElementById('image');
    if (result !== undefined) {
      const classifier = result;
      classifier.classify(img, this.gotResult);
    }
    // image(this.img, 0, 0);
  }

  private gotResult(error, results) {
    // Display error in the console
    if (error) {
      console.error(error);
    } else {
      // The results are in an array ordered by confidence.
      console.log(results);
      // createDiv(`Label: ${results[0].label}`);
      // createDiv(`Confidence: ${(results[0].confidence, 0, 2)}`);
    }
  }

  // Initialize the Image Classifier method with MobileNet. A callback needs to be passed.
// let classifier;

// A variable to hold the image we want to classify
// let img;

// function preload() {
//   classifier = ml5.imageClassifier('MobileNet');
// //   img = loadImage('images/bird.png');
// //   img = loadImage('images/zonnebloem.jpg');
//   img = loadImage('images/cars411.png');
// }

// function setup() {
//   createCanvas(400, 400);
//   classifier.classify(img, gotResult);
//   image(img, 0, 0);
// }

// A function to run when we get any errors and the results
// function gotResult(error, results) {
//   // Display error in the console
//   if (error) {
//     console.error(error);
//   } else {
//     // The results are in an array ordered by confidence.
//     console.log(results);
//     createDiv(`Label: ${results[0].label}`);
//     createDiv(`Confidence: ${(results[0].confidence, 0, 2)}`);
//   }
// }


}
