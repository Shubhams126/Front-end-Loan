import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class CibilService {
  http=inject(HttpClient);

  url="https://localhost:44365/api/Cibil/calculate/";
  calculateCibil(customerId:number)
  {
    return this.http.post<any>(this.url+customerId,{});
  }

  url1="https://localhost:44365/api/Cibil/latest/";
  getLatestCibil(customerId:number)
  {
    return this.http.get<any>(this.url1+customerId);
  }  
}
