
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ForeclosureService {

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  loanurl = 'https://localhost:44365/api/loan-accounts/my-accounts';

  getloanaccounts() {
    return this.http.get<any>(this.loanurl, {
      headers: this.getHeaders()
    });
  }

  url = 'https://localhost:44365/api/ForeClosure/CreateForeClousre';

  createforeclosure(data: any) {
    return this.http.post<any>(this.url, data, {
      headers: this.getHeaders()
    });
  }

  url1 = 'https://localhost:44365/api/ForeClosure/FCGetBy';

  myrequest() {
    return this.http.get<any>(this.url1, {
      headers: this.getHeaders()
    });
  }
}
