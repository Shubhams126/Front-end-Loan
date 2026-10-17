import { Component, signal } from '@angular/core';
import { CibilService } from '../cibil-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cibil',
  imports: [CommonModule, FormsModule],
  templateUrl: './cibil.html',
  styleUrl: './cibil.scss',
})
export class Cibil {
  constructor(private service:CibilService) {}

  customerId:any;
  report=signal<any>(null);
  errorMessage=signal('');

  checkScore()
  {
    if(!this.customerId)
    {
      this.errorMessage.set('Please enter a customer id');
      return;
    }

    this.errorMessage.set('');
    this.service.calculateCibil(this.customerId).subscribe({
      next:res=>{
        console.log(res);
        this.report.set(res.data);
      },
      error:err=>{
        console.log(err);
        this.showError(err);
      }
    });
  }

  viewLastScore()
  {
    if(!this.customerId)
    {
      this.errorMessage.set('Please enter a customer id');
      return;
    }

    this.errorMessage.set('');
    this.service.getLatestCibil(this.customerId).subscribe({
      next:res=>{
        console.log(res);
        this.report.set(res.data);
      },
      error:err=>{
        console.log(err);
        this.showError(err);
      }
    });
  }

  showError(err:any)
  {
    this.report.set(null);
    if(err.status==404)
    {
      // the API sends plain text for 404
      this.errorMessage.set(err.error);
    }
    else
    {
      this.errorMessage.set('Something went wrong. Is the API running?');
    }
  }

  getColor()
  {
    let score=this.report()?.cibilScore;

    if(score<600)
    {
      return 'red';
    }
    else if(score<750)
    {
      return 'orange';
    }
    else
    {
      return 'green';
    }
  }

  getRotation()
  {
    let score=this.report()?.cibilScore;
    let angle=((score-500)*180/400)-90;

    if(angle<-90)
    {
      angle=-90;
    }
    if(angle>90)
    {
      angle=90;
    }
    return angle;
  }
}