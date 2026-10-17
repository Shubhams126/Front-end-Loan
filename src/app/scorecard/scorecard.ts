import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ScoreCardService } from '../scorecard-service';

@Component({
  selector: 'app-score-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './scorecard.html',
  styleUrl: './scorecard.scss',
})
export class ScoreCard {
  constructor(private service:ScoreCardService, private route:ActivatedRoute) {
    this.customerId=Number(this.route.snapshot.paramMap.get('id'));
    this.generateScoreCard();
  }

  customerId:number;
  scoreCard=signal<any>(null);
  errorMessage=signal('');

  generateScoreCard()
  {
    this.service.generateScoreCard(this.customerId).subscribe({
      next:res=>{
        console.log(res);
        this.scoreCard.set(res.data);
      },
      error:err=>{
        console.log(err);
        if(err.status==404 && typeof err.error=='string')
        {
          this.errorMessage.set(err.error);
        }
        else
        {
          this.errorMessage.set('Something went wrong. Is the API running?');
        }
      }
    });
  }
}