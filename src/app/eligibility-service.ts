import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EligibilityService {
  http=inject(HttpClient);

  url="https://localhost:44365/api/Eligibility/check/";
  checkEligibility(customerId:number,tenureMonths:number)
  {
    return this.http.post<any>(this.url+customerId+'/'+tenureMonths,{});
  }

  url1="https://localhost:44365/api/Eligibility/manual-reviews";
  getManualReviews()
  {
    return this.http.get<any>(this.url1);
  }

  url2="https://localhost:44365/api/Eligibility/manual-review/decision";
  decideManualReview(decision:any)
  {
    return this.http.post<any>(this.url2,decision);
  }
}