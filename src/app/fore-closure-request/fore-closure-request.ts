  import { Component } from '@angular/core';
import { ForeRequestService } from '../fore-request-service';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';

declare var Razorpay: any;
@Component({
  selector: 'app-fore-closure-request',
  imports: [FormsModule,NgFor,CommonModule],
  templateUrl: './fore-closure-request.html',
  styleUrl: './fore-closure-request.scss',
})
export class ForeClosureRequest {
  constructor(private service:ForeRequestService,private router: Router){
    this.fetchrequests();
  }

  allrequests:any;
  fetchrequests()
  {
    this.service.getrequests().subscribe({
      next:res=>
      {
        console.log(res.data)
         this.allrequests=res.data ?? [];
      },
      error:err=>
      {
         console.log(err);
      }
    })
  }

  viewRequest(req:any)
  {
   this.router.navigateByUrl('/foreclosure-details/' + req.requestId);
  }
  
  
 
}
