import { Injectable } from '@angular/core';
// import * as ml5 from 'ml5';
declare let ml5: any;

@Injectable({
  providedIn: 'root'
})
export class AiService {

  public modelReady;
  private classifier;

  constructor() {
    this.classifier = ml5.imageClassifier('MobileNet', this.modelLoaded);
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

  private modelLoaded() {
    this.modelReady = true;
  }


}
