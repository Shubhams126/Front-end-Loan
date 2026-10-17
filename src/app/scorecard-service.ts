import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScoreCardService {
  http=inject(HttpClient);

  url="https://localhost:44365/api/ScoreCard/generate/";
  generateScoreCard(customerId:number)
  {
    return this.http.post<any>(this.url+customerId,{});
  }
}