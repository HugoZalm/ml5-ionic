import { Injectable } from '@angular/core';
declare let ml5: any;

@Injectable({
  providedIn: 'root'
})
export class AiService {

  public classifierReady;
  public detectorReady;
  private classifier;
  private detector;

  constructor() {
    this.classifier = ml5.imageClassifier('MobileNet', this.classifierLoaded);
    this.detector = ml5.objectDetector('cocossd', this.detectorLoaded);
  }

  public classify(image): Promise<string[]> {
    const res = [];
    return ml5.imageClassifier('MobileNet')
    .then(classifier => classifier.classify(image))
    .then(
      // error => {
      //   console.log(error);
      // },
      results => {
        results.forEach(r => {
          res.push(r.label + ' (' + ((r.confidence) * 100).toFixed(0) + '%)');
        });
      return res;
    })
    .catch((error) => console.log(error));
  }

  public detect(image): Promise<string[]> {
    const res = [];
    return ml5.objectDetector('cocossd')
    .then(detector => detector.detect(image))
    .then(
      // error => {
      //   console.log(error);
      // },
      results => results)
    .catch((error) => console.log(error));
  }

  private classifierLoaded() {
    this.classifierReady = true;
  }

  private detectorLoaded() {
    this.detectorReady = true;
  }

}
