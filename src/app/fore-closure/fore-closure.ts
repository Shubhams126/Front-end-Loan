import { Component } from '@angular/core';
import {  ForeclosureService } from '../foreclosureservice';

import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ForeRequestService } from '../fore-request-service';

import { CustomerDashboard } from '../customer-dashboard/customer-dashboard';

declare var Razorpay: any;
@Component({
  selector: 'app-fore-closure',
  imports: [CommonModule,ReactiveFormsModule,CustomerDashboard],
  templateUrl: './fore-closure.html',
  styleUrl: './fore-closure.scss',
})
export class ForeClosure {

  constructor(private service:ForeclosureService,private ser:ForeRequestService){
     this.getLoanAccounts();
     this.myreq();
  }
  
  loanaccounts:any;
  selectedLoan:any;
  getLoanAccounts() {
  this.service.getloanaccounts().subscribe({
    next: (res: any) => {
      console.log(res.data);

      this.loanaccounts = res.data ?? [];

      if (this.loanaccounts.length > 0) {
        this.selectedLoan = this.loanaccounts[0];

        this.foreclosureform.patchValue({
          loanAccountId: this.selectedLoan.loanAccountId,
          foreClosureAmount: this.selectedLoan.outstandingPrincipal
        });
      } else {
        this.selectedLoan = null;
      }
    },
    error: (err: any) => {
      console.error('Error loading loan accounts:', err);
    }
  });
}

onChangeLoan(event: any) {
  const id = Number(event.target.value);

  this.selectedLoan = this.loanaccounts.find(
    (loan: any) => loan.loanAccountId === id
  );

  if (this.selectedLoan) {
    this.foreclosureform.patchValue({
      loanAccountId: id,
      foreClosureAmount: this.selectedLoan.outstandingPrincipal
    });
  }
}

foreclosureform=new FormGroup({
  requestId: new FormControl<number>(0),
  loanAccountId: new FormControl<number>(0),
  foreClosureType: new FormControl<string>('Full'),
  foreClosureAmount: new FormControl<number>(0),
  partialAmount: new FormControl<number>(0),
  requestedDate: new FormControl<string>(new Date().toISOString()),
  expectedClosureDate: new FormControl<string>(''),
  reason: new FormControl<string>(''),
  approvedDate: new FormControl<string | null>(null),
  isPaid: new FormControl<boolean>(false),
  paidDate: new FormControl<string | null>(null)
});

submitrequest(data:any)
{
   console.log('Form data:', data);
  console.log('Request JSON:', JSON.stringify(data));
  this.service.createforeclosure(data).subscribe({
    
    next:res=>{
       alert(res.message);
    },
    error:err=>{
    console.log('Validation errors:', err.error.errors);
  console.log('Full error:', err.error);
    }
  });
}

myrequests:any
myreq()
{
  this.service.myrequest().subscribe({
    next: res=>{
       console.log(res.data);
       this.myrequests=res.data;
    },
    error:err=>{
       console.log(err);
    }
  })
}


payForeClosure(request: any) {
  const requestId = request.requestId;
  this.ser.createForeClosureOrder(requestId).subscribe({
    next: (res: any) => {
      console.log('Foreclosure Order:', res);
      const orderId = res.orderId;
      const amount = request.foreClosureType === 'Full'
        ? request.foreClosureAmount
        : request.partialAmount;
      const options = {
        key: 'rzp_test_SguRsFLUPmLB46',
        amount: amount * 100,
        currency: 'INR',
        name: 'Loan Management System',
        description: 'Foreclosure Payment',
        order_id: orderId,
        handler: (response: any) => {
          const data = {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            requestId: requestId,
            paymentMode: 'UPI'
          };
          this.ser.verifypayment(data).subscribe({
            next: (verifyRes: any) => {
              console.log('Verification:', verifyRes);
              alert('Foreclosure payment successful!');
               this.myreq();
            },
            error: (err: any) => {
              console.error(err);
              alert('Payment verification failed.');
            }
          });
        },
        theme: {
          color: '#3399cc'
        }
      };
      const razorpay = new Razorpay(options);
      razorpay.open();
    },
    error: (err: any) => {
      console.error('Order creation failed:', err);
      alert('Unable to create foreclosure payment order.');
    }
  });
}
}
