import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ForeRequestService {
  
  constructor(private http:HttpClient)
  {

  }

  url="https://localhost:44365/api/ForeClosure/GetForeClousres";
  
  getrequests()
  {
    return this.http.get<any>(this.url);
  }

  url2="https://localhost:44365/api/ForeClosure";
  getForeClosure(id:any) {
  return this.http.get<any>(`${this.url2}/${id}`);
}

url3="https://localhost:44365/api/ForeClosure/UpdateForeClousre";

updaterequest(id:any,status:any)
{
 return this.http.put<any>(`${this.url3}/${id}`,{ status: status})
}



url4="https://localhost:44365/api/ForeClosure/CreateForeClosureOrder"
createForeClosureOrder(rid:any)
{
  return this.http.post<any>(`${this.url4}/${rid}`,{});
}

url5="https://localhost:44365/api/ForeClosure/VerifyForeClosurePayment"

verifypayment(data:any)
{
  return this.http.post<any>(this.url5,data);
}
}
