import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ForeRequestService } from '../fore-request-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-foreclosuredetails',
  imports: [CommonModule],
  templateUrl: './foreclosuredetails.html',
  styleUrl: './foreclosuredetails.scss',
})
export class Foreclosuredetails {
  constructor( private router: Router,private service:ForeRequestService ,private route: ActivatedRoute){
 this.foredetails();
  }

  requestId:any;
  details: any;
 
  foredetails(){
    this.requestId = Number(this.route.snapshot.paramMap.get('id'));
    this.service.getForeClosure(this.requestId).subscribe({
      next:res=>{
         console.log(res.data)
         this.details = res.data;
      },
      error:err=>{
         console.log(err);
      }

    })
  }


  approveRequest()
{
   this.updateRequest("Approved");
}
rejectRequest(){
  this.updateRequest("Rejected");
}

updateRequest(status:any)
{
  this.service.updaterequest(this.requestId , status).subscribe({
    next:res=>{
         this.details.status = status;
         alert(res.message);
    },
    error:err=>{
          console.log('Full error:', err);
      console.log('Validation errors:', err.error?.errors);
      console.log('Error title:', err.error?.title);
      alert('Failed to update request. Check the console.');
    }
  })

}

 

}
